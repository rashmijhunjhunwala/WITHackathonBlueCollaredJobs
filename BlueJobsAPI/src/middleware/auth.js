const jwt = require('jsonwebtoken')
const Employer = require('../models/employer')


//Auth Guard for employee
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const employer = await Employer.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!employer) {
            throw new Error()
        }

        req.token = token
        req.employer = employer
        next()
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports = auth