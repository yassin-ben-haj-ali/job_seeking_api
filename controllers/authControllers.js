const AuthService = require("../services/authService");

const register = async (req, res) => {
    const { token, options } = await AuthService.register(req.body)
    return res.status(201).cookie("token", token, options).json({ success: true, message: "user registered with success" });
};
const login = async (req, res) => {
    const { token, options } = await AuthService.login(req.body)
    return res.status(201).cookie("token", token, options).json({ success: true, message: "user logged in with success" });
};

module.exports = { 
    register,
    login 
}
