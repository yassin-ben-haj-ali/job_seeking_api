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

const isAuthorized = (...roles) =>
    catchAsyncErrors(async (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next()
        }
        throw new AuthorizationError(`${req.user.role} not allowed to access this resource.`)
    })


module.exports = {
    isAuthenticated,
    isAuthorized
}