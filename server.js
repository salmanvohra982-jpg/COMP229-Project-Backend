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

/*var userRouter = require("./app/routers/user");
var ticketRouter = require('./app/routers/ticket');
var authRouter = require('./app/routers/auth');*/

var app = express();

configDb();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// simple test route
app.get("/api/status", (req, res) =>
  res.json({ message: "Helpdesk backend up and running" })
);

/*app.use('/auth', authRouter)
app.use('/api/users', userRouter);
app.use('/api/ticket', ticketRouter);*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Route not found'));
});

// error handler
app.use(function(err, req, res, next) {
     // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);

    res.json({
        success: false,
        message: err.message
    });
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});