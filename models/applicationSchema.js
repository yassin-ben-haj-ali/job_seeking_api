const mongoose = require("mongoose");
const validator=require('validator')

const applicationSchema = new mongoose.Schema({

    jobSeekerInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, "Please provide a valid email."]
        },
        phone: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        resume: {
            type: String,
            required: true
        },
        coverLetter: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["Job Seeker"],
        }
    },
    employerInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["Employer"]
        }
    },
    jobInfo: {
        JobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },
        JobTitle: {
            type: String,
            required: true
        },

    }
})

const application = mongoose.model("Application", applicationSchema);

module.exports = application