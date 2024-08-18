const { BadRequestError } = require("../utils/appErrors")
const User = require('../models/userSchema');

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
    const { role, _id:userId} = connectedUser;

    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
        throw new BadRequestError("Please provide your all preferred job niches")
    }
    const user = await User.findByIdAndUpdate(userId, newUserData, {
        new:true,
        runValidators:true
    })

    return user;
}

module.exports={updateProfile}