// when we req something from user we use req & when we provide something to user is res.
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel.js');

// Token
const generateToken = require('../utils/generateToken.js');

// registerUser
const registerUser = asyncHandler(async(req,res) => {
    const { name, email, password, pic } = req.body;

    // Checking if user already exists

    const userExists = await User.findOne( { email });

    if(userExists){
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            // password : user.password,
            isAdmin : user.isAdmin,
            pic : user.pic,
            token : generateToken(user._id),
        });
    } else{
        res.status(400);
        throw new Error('Error has been occured!!!');
    }

    // res.json({
    //    name,
    //    email, 
    // });
});

// loginUser
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // password : user.password,
            isAdmin : user.isAdmin,
            pic : user.pic,
            token : generateToken(user._id),
        });
    } else{
        res.status(400);
        throw new Error("Invalid Email or Password!!");
    }
});

module.exports = { registerUser, loginUser };