/* 
    File: user.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Defines the MongoDB schema and model for user accounts, including username, email, password, and user type (admin or regular user)
    Date: November 09 2025
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Username is required"
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        password: {
            type: String,
            required: "Password is required"
        },
        userType: {
            type: String,
            enum: ['Admin', 'User'],
            default: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true
        }
    },
    {
        collection: "users"
    }
);

module.exports = mongoose.model('User', userSchema);