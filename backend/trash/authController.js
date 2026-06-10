import jwt from "jsonwebtoken";
import User from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm
    // });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
        status: 'Success',
        token, 
        data: {
            user: newUser,
        }
    })
});

export const login = (req, res, next) => {
    const {email, password} = req.body;
    
    // 1. check if email and password exist
    if(!email || !password){
        return next(new AppError('Please provide email and password!', 400));
    }

    // 2. check if user exists && password is correct
    const user = User.findOne({email});

    // 3. if everything ok, send token to client
    const token = '';
    res.status(200).json({
        status: 'Success',
        token
    });
}