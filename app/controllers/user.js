/* 
    File: user.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Handles user-related operations such as retrieving profiles, updating user details, and managing user accounts in MongoDB
    Date: November 09 2025
*/

const UserModel = require('../models/user');

// Get all users (admin only)
module.exports.list = async function (req, res, next) {
  try {
    let users = await find().select('-password');
    res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Get one user
module.exports.profile = async function (req, res, next) {
  try {
    let user = await findById(req.auth.id).select('-password');
    if (!user) return res.json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Update profile
module.exports.update = async function (req, res, next) {
  try {
    let updated = await findByIdAndUpdate(req.auth.id, req.body, { new: true }).select('-password');
    res.json(updated);
  } catch (error) {
    console.log(error);
    next(error);
  }
}