const User = require("../models/userSchema");
const { AuthorizationError } = require("../utils/appErrors");
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require("./catchAsyncErrors");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new AuthorizationError("User is not authenticated")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next()
})

module.exports = isAuthenticated