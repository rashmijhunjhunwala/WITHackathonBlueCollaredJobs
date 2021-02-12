const express = require('express')
const Seeker = require('../models/seeker')
const router = new express.Router()
const Jobs = require('../models/job')
const authSeeker = require ('../middleware/authSeeker')


//update profile
//upload picture
//get picture
//apply to jobs

//Registering the seeker
router.post('/seeker/register', async (req, res) => {
    const seeker = new Seeker(req.body);
    console.log(seeker);
    try {
        await seeker.save()
        console.log(seeker);
        const token = await seeker.generateAuthToken()
        console.log(token);
        res.status(201).send({ seeker, token })
        
    } catch (e) {
        res.status(400).send(e)
    }
})

//Logging in the seeker
router.post('/seeker/login', async (req, res) => {
    try {
        const seeker = await Seeker.findByCredentials(req.body.email, req.body.password)
        const token = await seeker.generateAuthToken()
        res.status(200).send({ seeker, token })
    } catch (e) {
        res.status(400).send()
    }
})


//Logging out the seeker
router.post('/seeker/logout', authSeeker , async (req, res) => {
    try {
        req.seeker.tokens = req.seeker.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.seeker.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//Logging out the seeker from all devices
router.post('/seeker/logoutAll', authSeeker, async (req, res) => {
    try {
        req.seeker.tokens = []
        await req.seeker.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//Getting the profile of the seeker
router.get('/seeker/me', authSeeker, async (req, res) => {
    res.send(req.seeker)
})

//get jobs by category
//get jobs near you
//sort jobs recently posted
//sort jobs by wages
router.get('/jobs', authSeeker, async (req, res) => {
        
        try {
            const query = {}
            const sort = {}
            if(req.query.category)
                query.category=req.query.category
            if(req.query.latitude && req.query.longitude) {
                query.location = {
                    $near : {
                        $geometry: {
                            type: "Point",
                            coordinates: [req.query.latitude, req.query.longitude]
                        }
                    }
                }
            }
            if(req.query.sortBy)
            {
                const parts = req.query.sortBy.split(':')
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
            }
            const jobsByQuery = await Jobs.find(query).sort(sort);
            res.status(200).send(jobsByQuery)
        }
        catch(e)
        {
            res.status(400).send(e);
        }
    })



module.exports = router