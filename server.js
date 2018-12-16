require('dotenv').config();

const
    express = require('express'),
    app = express(),
    PORT = 3000,
    mongoose = require('mongoose'),
    mongooseConnectionString = 'mongodb://admin:assembly1234@ds135704.mlab.com:35704/project_1';

// mongoose connection
mongoose.connect(mongooseConnectionString, err => {
    console.log(err || `Connected to MLab (Project_1)`);
});


// listen to port
app.listen(PORT, err => {
    console.log(err || `Connected to PORT: ${PORT}`);
});




