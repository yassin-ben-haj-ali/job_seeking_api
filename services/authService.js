const User = require("../models/userSchema");
const { BadRequestError, AlreadyExistError, NotFoundError, AuthorizationError } = require("../utils/appErrors");
const sendToken = require("../utils/jwToken");

const register = async (body, resume = null) => {

    const { name, email, phone, address, password, role, firstNiche, secondNiche, thirdNiche, coverLetter } = body;

    if (!name || !email || !phone || !address || !password || !role) {
        throw new BadRequestError("All fields are required.")
    }
    if (role == "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
        throw new BadRequestError("Please provide your preferred job niches.")
    }
    const exist = await User.findOne({ email })
    if (exist) {
        throw new AlreadyExistError("Email is already registered.")
    }
    const userData = {
        name,
        email,
        phone,
        address,
        password,
        role,
        niches: { firstNiche, secondNiche, thirdNiche },
        coverLetter
    }
    if (resume) {
        userData.resume = resume
    }
    const user = await User.create(userData);
    return sendToken(user);

}

const login = async (body) => {

    const { password, email } = body;

    if (!email || !password) {
        throw new BadRequestError("Email and password are required.")
    }
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        throw new NotFoundError("Invalid email or password.")
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        throw new AuthorizationError("Invalid email or password.")
    }

    return sendToken(user);
}

module.exports = {
    register,
    login
}