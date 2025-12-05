const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth'); // 👈 add this

// PUBLIC (if you want – you can also protect these later)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// PROTECTED – need token
router.post('/', auth, userController.createUser);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
