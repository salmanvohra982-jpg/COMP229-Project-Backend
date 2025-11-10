/* 
    File: auth.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Handles user registration, login, and JWT authentication logic
    Date: November 09 2025
*/

const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

// Register Users
module.exports.registerUser = async function (req, res, next) {
    try {
        const { username, email, password, userType } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return
            res.json(
                {
                    message: 'User already exists with this email.'
                }
            );
        }

        // Hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // New User
        const newUser = new UserModel(
            {
                username,
                email,
                password: hashedPassword,
                userType
            });

        await newUser.save();
        res.json(
            {
                message: 'User registered successfully'
            });

    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Login Users
module.exports.loginUser = async function (req, res, next) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ message: 'User not found.' });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: 'Invalid email or password.' });
        }

        // JWT payload
        const payload = {
            id: user._id,
            username: user.username,
            role: user.userType
        };

        // Generate token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: 'HS512',
            expiresIn: '20m'
        });

        // Send response with token
        res.json({
            success: true,
            message: 'Authentication successful',
            token: token
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Verify Tocken
module.exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS512'],
    userProperty: 'auth'
});

// Get Profile
module.exports.getProfile = async function (req, res, next) {
    try {
        const user = await UserModel.findById(req.auth.id).select('-password');
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        next(error);
    }
};