/* 
    File: ticket.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Handles business logic for Help Desk ticket operations such as creating, updating, retrieving, and managing ticket status
    Date: November 09 2025
*/

const TicketModel = require('../models/ticket');

// Create ticket
module.exports.create = async function (req, res, next) {

    try {

        const today = new Date(); 
        const datePrefix = today.toISOString().slice(0, 10).replace(/-/g, '');
        const count = await TicketModel.countDocuments();
        const ticketNumber = `${datePrefix}-${String(count + 1).padStart(6, '0')}`;

        let ticket = new TicketModel({...req.body, ticketNumber, createdBy: req.auth.id, status: 'New'});

        await ticket.save();

        res.json(ticket);
    } catch (error) {
        console.log(error);
        next(error)
    }
};

// Get all tickets
exports.list = async function (req, res, next) {
    try {
        let list = await TicketModel.find();
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get Ticket By ID
module.exports.ticketById = async function (req, res, next) {
    try {

        let ticket = await TicketModel.findOne({ _id: req.params.id })

        res.json(ticket);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Update By ID
module.exports.update = async function (req, res, next) {
    try {

        console.log("body: " + req.body);

        let ticket = await TicketModel.findById(req.params.id);
        if (ticket.status === 'Closed') {
            return res.json({ message: "Closed tickets cannot be modified." });
        }

        let updatedTicket = TicketModel(req.body);
        updatedTicket._id = req.params.id;

        let result = await TicketModel.updateOne({ _id: req.params.id }, updatedTicket);

        console.log(result);
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Ticket updated successfully."
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('Ticket not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// Cancel Ticket
module.exports.cancel = async function (req, res, next) {
    try {
        let result = await TicketModel.updateOne(
            { _id: req.params.id },
            { status: 'Cancelled' }
        );
        res.json(
            {
                success: true,
                message: "Ticket cancelled successfully."
            }
        );
    } catch (error) {
        console.log(error);
        next(error)
    }
};