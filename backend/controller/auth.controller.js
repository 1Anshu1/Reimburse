import User from "../models/user.model.js";
import asyncWrapper from "../middlewares/asyncWrapper.middleware.js";
import CustomError from "../utils/customError.js";
import { createToken } from "../utils/jwt.util.js";

const signup = asyncWrapper(async (req, res, next) => {
    const { name, email, password, organization, department } = req.body;

    if (!name || !email || !password || !organization || !department) {
        next(new CustomError(401, "required field missing"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        next(new CustomError(401, "user already exists"));
    }

    const user = await User.create({
        name,
        email,
        password,
        organization,
        department,
    });

    user.password = undefined;
    const token = createToken({ id: user._id, role: user.role });
    res.status(200).json({ message: "user registered successfully", user, token });
});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new CustomError(400, "required field missing"));
    }
    const user = await User.findOne({ email });
    if (!user) {
        next(new CustomError(400, "invalid credentials"));
    }

    const verifyPassword = await user.comparePassword(password);
    if (!verifyPassword) {
        next(new CustomError(400, "invalid credentials"));
    }

    user.password = undefined;
    const token = createToken({ id: user._id, role: user.role });
    res.status(200).json({ message: "login successful", user, token });
});

export { signup, login };
