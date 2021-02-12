const jwt = require('jsonwebtoken')
const Seeker = require('../models/seeker')


//Auth Guard for Seeker
const authSeeker = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const seeker = await Seeker.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!seeker) {
            throw new Error()
        }

        req.token = token
        req.seeker = seeker
        next()
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports = authSeeker