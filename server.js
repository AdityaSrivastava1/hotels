const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body


app.get("/" , function (req,res) {
    res.send("Welcome Ji, to our hotel");
})

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);
 
PORT = process.env.PORT || 4000
app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`)
})