/* 
    File: index.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Handles the message for landing page of the backend
    Date: November 09 2025
*/

module.exports.home = function(req, res, next){

    let messageObj = {
        message: "Welcome To Help Desk Backend Site"
    };

    res.json(messageObj);
}