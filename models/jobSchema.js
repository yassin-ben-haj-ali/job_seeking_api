const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ["Full-time", "Part-time"]
    },
    location: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    introduction: {
        type: String
    },
    responsibilities: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    offers: {
        type: String
    },
    salary: {
        type: String
    },
    hiringMultipleCandidates: {
        type: Boolean,
        default: false
    },
    personalWebsite: {
        title: String,
        url: String
    },
    jobNiche: {
        type: String,
        required: true
    },
    newsLetterSent: {
        type: Boolean,
        default: false
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true }
)


const job = mongoose.model('job', jobSchema)

module.exports = job