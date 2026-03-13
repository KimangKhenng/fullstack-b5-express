import ProfileModel from "../models/profileModel.js";
import UserModel from "../models/userModel.js";
import asyncHandler from 'express-async-handler'

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find({}).populate('posts').populate('postCount').lean()
    return res.json(users)
})

export const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id
    const user = await UserModel.findById(userId)
    return res.json(user)

})

export const createUser = asyncHandler(async (req, res) => {
    const {
        firstName, lastName, dateOfBirth, username, age
    } = req.body
    const user = new UserModel({
        firstName,
        lastName,
        dateOfBirth,
        age
    })
    const profile = new ProfileModel({
        nickname: "KK",
        photo: "url:///"
    })
    await profile.save()
    user.profile = profile._id
    await user.save()
    res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
    });
})

export const updateUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,           // Return updated document
            runValidators: true  // Run schema validators
        }
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }

    res.status(200).json({
        success: true,
        data: user,
        message: 'User updated successfully'
    });
})

export const deleteUser = asyncHandler(async (req, res) => {
    const product = await UserModel.findByIdAndDelete(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }

    res.status(200).json({
        success: true,
        data: {},
        message: 'User deleted successfully'
    });
})