require('dotenv').config();

const
    express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    mongoose = require('mongoose');

// database connection
require('./db');

// middleware
app.use(express.json());

// routes
const profileRouter = require('./routers/profileRouter');
app.use('/user/profile', profileRouter);






// listen to port
app.listen(PORT, err => {
    console.log(err || `Connected to PORT: ${PORT}`);
});




