const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        // required : true,
    },
    email : {
        type : String,
        // required : true,
    },
    age : {
        type : Number,
    },
    phone : {
        type : Number,
    },
    address : {
        type : String,
    },
    // created : {
    //     type : Date,
    //     required : true,
    //     default : Date.now,
    // },
});

module.exports = mongoose.model("User", userSchema);