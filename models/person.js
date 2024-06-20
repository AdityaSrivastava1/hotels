const mongoose = require("mongoose");

//define the Person schema

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        enum:["chef" , "waiter","manager"]
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }



});

//create Person model

const Person = mongoose.model('Person',personSchema );
module.exports = Person;