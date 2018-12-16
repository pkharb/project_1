require('dotenv').config();

const
    express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    mongooseConnectionString = process.env.MONGOD_URI;

// mongoose connection
mongoose.connect(mongooseConnectionString, err => {
    console.log(err || `Connected to MLab (Project_1)`);
});


// listen to port
app.listen(PORT, err => {
    console.log(err || `Connected to PORT: ${PORT}`);
});




