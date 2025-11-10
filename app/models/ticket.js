/* 
    File: ticket.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Defines the MongoDB schema and model for Help Desk tickets, including ticket number, description, priority, status, assigned user, and comments
    Date: November 09 2025
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
    {
        ticketNumber: { 
            type: String, 
            unique: true 
        },
        title: String,
        description: String,
        priority: { 
            type: String, 
            enum: ['Low', 'Medium', 'High'], 
            default: 'Low' 
        },
        status: { 
            type: String, 
            enum: ['New', 'In Progress', 'Closed'], 
            default: 'New' 
        },
        createdBy: { 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        },
        assignedTo: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            default: null 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        comments: [
            { 
                text: String, 
                author: String, 
                date: { 
                    type: Date, 
                    default: Date.now 
                } 
            }
        ],
});

module.exports = mongoose.model('Ticket', ticketSchema);