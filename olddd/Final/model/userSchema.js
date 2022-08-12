const db = require('../model/db.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create an schema
const userSchema = new Schema({
    name: String,
    email:String,
    password: String
});

module.exports = mongoose.model('User', userSchema); 

/*
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email:String
});

var userModel=mongoose.model('users',userSchema);

module.exports = mongoose.model("Users", userModel);
*/
