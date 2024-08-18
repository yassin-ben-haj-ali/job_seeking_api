const UserService = require('../services/userService')

const getUser = async (req, res) => {
    const { user } = req;
    res.status(200).json({
        success: true,
        user
    })
}

const updateProfile = async (req, res) => {
    const user = await UserService.updateProfile(req.body, req.user)
    return res.status(201).json({ success: true, message: "profile updated.", user });
};

const updatePassword = async (req, res) => {
    const { token, options } = await UserService.updatePassword(req.user._id,req.body)
    return res.status(201).cookie("token", token, options).json({ success: true, message:"password updated." });
};

module.exports = {
    getUser,
    updateProfile,
    updatePassword
}