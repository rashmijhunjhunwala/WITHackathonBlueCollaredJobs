const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Job = require('./job')

const seekerSchema = new mongoose.Schema({
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
    category: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        default: 0,
        required: true
    },
    skills : {
        type: String,
        trim: true,
        required: true
    },
    pincode: {
        type: Number,
        required: true,
        trim: true
    },
    address : {
        type: String,
        trim: true,
        required: true
    },
    location: {
        type: { type: String , default: "Point"},
        coordinates: [Number],
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
seekerSchema.index({ location: "2dsphere" }); 

seekerSchema.methods.toJSON = function () {
    const seeker = this
    const userObject = seeker.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

//FindJobSeekerByCrediantials
seekerSchema.statics.findByCredentials = async (email, password) => {
    const seeker = await Seeker.findOne({ email })

    if (!seeker) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, seeker.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return seeker
}

//Generating the auth token 
seekerSchema.methods.generateAuthToken = async function () {
    const seeker = this
    const token = jwt.sign({ _id: seeker._id.toString() }, process.env.JWT_SECRET)
    seeker.tokens = seeker.tokens.concat({token})
    await seeker.save()

    return token
}



// Hash the plain text password before saving
seekerSchema.pre('save', async function (next) {
    const seeker = this
    if (seeker.isModified('password')) {
        seeker.password = await bcrypt.hash(seeker.password, 8)
    }
    next()
})


const Seeker = mongoose.model('Seeker', seekerSchema)

module.exports = Seeker