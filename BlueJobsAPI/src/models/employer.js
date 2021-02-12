const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Job = require('./job')

const employerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

employerSchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'owner'
})



employerSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

//A function to generate the auth Token
employerSchema.methods.generateAuthToken = async function () {
    const employer = this
    const token = jwt.sign({ _id: employer._id.toString() }, process.env.JWT_SECRET)

    employer.tokens = employer.tokens.concat({ token })
    await employer.save()

    return token
}

//FindemployeeByCredientials
employerSchema.statics.findByCredentials = async (email, password) => {
    const employer = await Employer.findOne({ email })

    if (!employer) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, employer.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return employer
}


// Hash the plain text password before saving
employerSchema.pre('save', async function (next) {
    const employer = this

    if (employer.isModified('password')) {
        employer.password = await bcrypt.hash(employer.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
employerSchema.pre('remove', async function (next) {
    const employer = this
    await Job.deleteMany({ owner: employer._id })
    next()
})

const Employer = mongoose.model('Employer', employerSchema)

module.exports = Employer