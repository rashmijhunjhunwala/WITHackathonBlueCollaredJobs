const express = require('express')
const Employer = require('../models/employer')
const auth = require('../middleware/auth')
const Job= require('../models/job')
const Seeker=require('../models/seeker')
const router = new express.Router()


//Registering the employer
router.post('/employer/register', async (req, res) => {
    const employer = new Employer(req.body);
    try {
        await employer.save()
        const token = await employer.generateAuthToken()
        res.status(201).send({ employer, token })
        
    } catch (e) {
        res.status(400).send(e)
    }
})


//Logging in the employer
router.post('/employer/login', async (req, res) => {
    try {
        const employer = await Employer.findByCredentials(req.body.email, req.body.password)
        const token = await employer.generateAuthToken()
        res.status(200).send({ employer, token })
    } catch (e) {
        res.status(400).send()
    }
})

//Logging Out the employer
router.post('/employer/logout', auth, async (req, res) => {
    try {
        console.log(req.employer);
        req.employer.tokens = req.employer.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.employer.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})


//Logging Out the employer from all devices
router.post('/employer/logoutAll',  auth, async (req, res) => {
    try {
        req.employer.tokens = []
        await req.employer.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//Getting the profile of the employer
router.get('/employer/me',  auth, async (req, res) => {
    res.send(req.employer)
})


//Creating Jobs
router.post('/employer/:id/createJob', auth, async (req, res) => {
    console.log("Hey");
    console.log(req.body);
    console.log(req.employer._id);
    const job = new Job({
        ...req.body,
        owner: req.employer._id
    })
    console.log(job);
    try {
        await job.save()
        res.status(201).send(job)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Getting the Jobs By A specific Employer
router.get('/employer/:id/jobs',  auth, async (req, res) => {

    const sort={}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.employer.populate({
            path: 'jobs',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.employer.jobs)
    } catch (e) {
        res.status(500).send()
    }
})


//Getting the nearBy candidates for a particular Job
router.get('/employer/:id/jobs/:id/getNearby',  auth, async (req, res) => {
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
        const candidatesByQuery = await Seeker.find(query);
        res.status(200).send(candidatesByQuery)
    }
    catch(e)
    {
        res.status(400).send(e);
    }

})


//get all the jobs 
//create a delete Job route
//create a update Job route
//create an avatar route
//create an update profile route
//get the matched profiles
//get the applied profiles

module.exports = router