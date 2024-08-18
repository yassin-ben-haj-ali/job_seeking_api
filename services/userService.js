const { BadRequestError } = require("../utils/appErrors")
const User = require('../models/userSchema');
const sendToken = require("../utils/jwToken");

const updateProfile = async (body, connectedUser) => {

    const newUserData = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        coverLetter: body.coverLetter,
        niches: {
            firstNiche: body.firstNiche,
            secondNiche: body.secondNiche,
            thirdNiche: body.thirdNiche
        },
    }
    const { firstNiche, secondNiche, thirdNiche } = newUserData.niches
    const { role, _id: userId } = connectedUser;

    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
        throw new BadRequestError("Please provide your all preferred job niches")
    }
    const user = await User.findByIdAndUpdate(userId, newUserData, {
        new: true,
        runValidators: true
    })

    return user;
}

const updatePassword = async (connectedUserId, body) => {
    const { oldPassword, newPassword, confirmPassword } = body;
    const user = await User.findById(connectedUserId).select("+password");
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) {
        throw new BadRequestError("Old password is incorrect.")
    }
    if (newPassword !== confirmPassword) {
        throw new BadRequestError("New password & confirm password do not match.")
    }
    user.password = newPassword;
    await user.save();
    return sendToken(user);
}

module.exports = {
    updateProfile,
    updatePassword
}