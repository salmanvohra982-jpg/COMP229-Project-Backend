/* 
    File: user.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Defines Express routes for user management (view profile, update profile, delete user)
    Date: November 09 2025
*/

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

router.get('/', requireSignin, UserController.list);
router.get('/profile', requireSignin, UserController.profile);
router.put('/profile', requireSignin, UserController.update);

module.exports = router;