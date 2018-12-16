require('dotenv').config();

const
    express = require('express'),
    app = express(),
    PORT = 3000;



// listen to port
app.listen(PORT, err => {
    console.log(err || `Connected to PORT: ${PORT}`);
});




