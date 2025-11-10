/* 
    File: auth.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Defines routes for user authentication (register, login, profile)
    Date: November 09 2025
*/

var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
const { requireSignin } = authController;

// User Registration
router.post('/register', authController.registerUser);

// User Login
router.post('/login', authController.loginUser);

// User Profile
router.get('/profile', requireSignin, authController.getProfile);

module.exports = router;