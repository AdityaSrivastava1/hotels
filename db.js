
require('dotenv').config();
const mongoose = require("mongoose");


const mongoUrl = process.env.mongoUrl;

if (!mongoUrl) {
    console.error("MongoDB URI is undefined. Please check your environment variables.");
    process.exit(1); // Exit the application if the URI is not defined
}

//set up MongoDB connection
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,  
    useUnifiedTopology:true,
})

//Get the default connection
//mongoose maintain the default connection object representing the
//Mongodb connection
const db = mongoose.connection;


//define event listners for database connection

db.on("connected",() => {
    console.log("database is connected");
})

db.on("error",(error) => {
    console.log("MongoDB connection error:" ,error);
})

db.on("Disconnected",(error) => {
    console.log("MongoDB disconnected");
})

module.exports = db;

