const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must contain at least 3 characters."],
        maxLength: [30, "Name cannot exceed 30 characters."]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide valid email."]
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    niches: {
        firstNiche: String,
        secondNiche: String,
        thirdNiche: String
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 characters."],
        maxLength: [32, "Password cannot exceed 32 characters."]
    },
    resume: {
        type: String,
    },
    coverLetter: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"]
    },
},
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const user = mongoose.model('user', userSchema)

module.exports = user