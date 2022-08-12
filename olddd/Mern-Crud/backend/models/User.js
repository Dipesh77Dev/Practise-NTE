// Require mongoose for file 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Require an isEmail validator from the 'validator' dependency.
const { isEmail } = require('validator');

// UserSchema which would be from Schema we defined earlier.

const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : [true,'Please enter an email'],
        unique : true,
        lowercase : true,
        validate : [isEmail, 'Please enter a valid email!!']
    },
    password : {
        type : String,
        required : [true, 'Please enter a valid password!!'],
        minlength : [6, 'Minimum password length must be 8 characters'],
        // maxlength : [10, 'Maximum password length must be 10 characters']
    },
    address : {
        type  : String,
    },
    phone : {
        type : Number,
    },
    register_date : {
        type : Date,
        default : Date.now
    }
    // we can also use - timestamps : true 
})

// Export user model created & we call this collection as 'user'. So, in database, Mongodb will pluralize it and save collection name as 'users'.
module.exports = User = mongoose.model('user', UserSchema); // We had built our UserSchema now we can build User model based on schema we created.

/*
1. Name - it contain the name of the user. it will be string Datatype, it is a required field & every user should have a name in our application.
2. Email - it contain the email of the user who is register on website. It would be String Datatype, it is a required field & also attach a custom error message to trigger when email is not provided. We want all emails to be unique se we turn unique to be true, We also want to store emails in lowercase so we put that to true. We check the provided email address is actually of email format or not, for this, we use the isEmail validator & attach a custom error message to it.
3. password - it contain the password of the user. It will be string Datatype, it is a required field so given required is true with some custom message. We also set a minimum length limit so that we do not allow password shorter than that length, same for maxlength.
4. register_date - it is responsible to store the data when user first register on our website. 
5. Address - We can give address. It is a string datatype.
6. Phone - We can give phone no. It is a number datatype.
*/