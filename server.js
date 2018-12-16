require('dotenv').config();

const
    express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    mongooseConnectionString = process.env.MONGOD_URI;

// database connection
require('./db');



// listen to port
app.listen(PORT, err => {
    console.log(err || `Connected to PORT: ${PORT}`);
});




