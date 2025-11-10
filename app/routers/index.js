/* 
    File: auth.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Defines routes for backend's home page
    Date: November 09 2025
*/

var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index');

router.get('/', indexController.home);

module.exports = router;