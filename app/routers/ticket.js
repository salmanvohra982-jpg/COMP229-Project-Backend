/* 
    File: ticket.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Defines Express routes for Help Desk ticket operations (create, view, update, change status)
    Date: November 09 2025
*/

var express = require('express');
var router = express.Router();

var TicketController = require('../controllers/ticket');
var authController = require('../controllers/auth');

router.get('/', TicketController.list);
router.post('/', authController.logtoken, authController.requireSignin, TicketController.create);
router.get('/:id', TicketController.ticketById);
router.put('/:id', authController.logtoken, authController.requireSignin, TicketController.update);
router.delete('/:id', authController.logtoken, authController.requireSignin, TicketController.hasAuthorization, TicketController.cancel);

module.exports = router;