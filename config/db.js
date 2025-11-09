const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function(){

    mongoose.connect(process.env.MONGO_URI);

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connectuion Error!!!'))

    mongodb.once('open', () => {
            console.log('=========> Connected To MongoDB <===========')
    })
    return mongodb;
}