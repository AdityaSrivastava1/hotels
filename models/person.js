const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }

});

personSchema.pre('save', async function(next) {
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Define the comparePassword method
personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};


//create Person model

const Person = mongoose.model('Person',personSchema );
module.exports = Person;