const express = require("express");
const app = express();
const db = require("./db");
const passport = require("./auth");
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

//Middleware function
const logRequest = (req,res,next) =>{
   console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
   next(); //Move on to next phase
}
 //when we want that on any request post put get delete middleware should be called then do this
 app.use(logRequest);



//using middleware locally
// app.get("/" ,logRequest, function (req,res) {
//     res.send("Welcome Ji, to our hotel");
// })

//implementing authentication 
app.use(passport.initialize());


const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get("/",localAuthMiddleware, function (req,res) {
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