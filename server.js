/* 
    File: server.js
    Developers: Salman Vahora, Bat An Dinh, Artemis, Edgar, Sriraj Bura
    Description: Entry for Help Desk backend (Part 2)
    Date: November 09 2025
*/

var express = require('express');
var cors = require('cors');
var createError = require('http-errors');
var logger = require('morgan');
var configDb = require('./config/db');
var dotenv = require('dotenv');
dotenv.config();

// ====== PORTFOLIO ROUTERS (your new models) ======
var userRouter = require("./app/routers/user");
var projectRouter = require("./app/routers/project");
var serviceRouter = require("./app/routers/service");
var contactRouter = require("./app/routers/contact");
var authRouter = require('./app/routers/auth');


// ====== OLD HELP DESK ROUTERS (you can ignore or delete) ======
// var ticketRouter = require('./app/routers/ticket');
// var authRouter = require('./app/routers/auth');

var app = express();

// connect database
configDb();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/auth', authRouter);  

// simple test route
app.get("/api/status", (req, res) =>
  res.json({ message: "Helpdesk backend up and running" })
);

// ====== MOUNT PORTFOLIO ROUTES ======
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', serviceRouter);
app.use('/api/contacts', contactRouter);

// ====== ERROR HANDLING ======
app.use(function (req, res, next) {
  next(createError(404, 'Route not found'));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
