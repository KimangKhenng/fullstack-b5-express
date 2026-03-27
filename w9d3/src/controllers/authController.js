import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Find user in system
    const user = await UserModel.findOne({ email: email }).select('email username password')

    console.log(user)

    if (!user) {
        return res.status(400).json({
            success: "false",
            message: "User or password incorrect"
        })
    }
    // User exist, start comparing password
    // Comparing (during login)
    console.log(password)
    console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Hello")
    if (!isMatch) {
        return res.status(400).json({
            success: "false",
            message: "User or password incorrect"
        })
    }
    // match! Let's sign JWT Token and send back to user
    const token = jwt.sign(
        {
            sub: user._id,
            email: user.email
        }, process.env.JWT_SECRET,
        {
            issuer: 'TFDServer',
            expiresIn: '15m'
        })

    const { password: pwd, ...userWithoutPassword } = user.toObject();

    return res.json({ token, user: userWithoutPassword })
})