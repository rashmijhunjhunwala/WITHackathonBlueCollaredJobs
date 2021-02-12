const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    headLine: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required : true,
    },
    skillsRequired: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
    },
    pincode: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: { type: String , default: "Point"},
        coordinates: [Number],
      },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employer'
    }
}, {
    timestamps: true
})

jobSchema.index({ location: "2dsphere" }); 

//FindJobsByCategory
jobSchema.statics.findByCategory = async (category) => {
    const jobs = await Job.find({category})
    if (!jobs) {
        throw new Error('Invalid Category')
    }

    return jobs
}


const Job = mongoose.model('Job', jobSchema)

module.exports = Job