const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name : {
        type : 'string',
        required : true,
        // unique : true
    },
    email : {
        type : 'string',
        required : true,
        unique : true
    },
    password : {
        type : 'string',
        required : true,
    },
    isAdmin : {
        type : 'boolean',
        required : true,
        default : false
    },
    pic : {
        type : 'string',
        required : true,
        default : 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    }
},{
    timestamps : true,
}
);

// For encrypting password -
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    // bcrpyt functionalities => 
    const salt = await bcrypt.genSalt(10); // genSalt - async; genSaltSync - sync; higher the value more secured password.
    this.password = await bcrypt.hash(this.password, salt);

}); // userSchema.pre('save') - Before saving we need to encrpyt user password; next is a middleware; 

// Decrpyt password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;