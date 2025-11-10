/* 
    File: ticket.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Defines Express routes for Help Desk ticket operations (create, view, update, change status)
    Date: November 09 2025
*/

const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket');
const { requireSignin } = require('../controllers/auth');

// Ticket CRUD routes
router.get('/', requireSignin, TicketController.list);
router.post('/', requireSignin, TicketController.create);
router.get('/:id', requireSignin, TicketController.ticketById);
router.put('/:id', requireSignin, TicketController.update);
router.delete('/:id', requireSignin, TicketController.cancel);

module.exports = router;