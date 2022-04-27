const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get("/users", (req, res) => {
    res.send("ALL USERS!!!");
});

// insert User 
router.post("/add", (req, res) => {
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        age : req.body.age,
        phone : req.body.phone,
        address : req.body.address,
    });
    user.save((err) => {
        if(err){
            res.json({message : err.message, type: 'danger'});
        } else {
            req.session.message = {
                type: 'success',
                message: 'User added successfully!!!',
            };
            res.redirect('/');
        }
    });
});

// Get User
router.get("/", (req, res) => {
    // res.send("HOME PAGE!!!");
    // res.render('index', { title: 'Home Page' }); 
    User.find().exec((err, users) => {
        if(err){
            res.json({ message: err.message });
        } else {
            res.render('index', { title: 'Home Page' , users: users});
        }
    });
});

// Update or edit user
router.get('/editUser/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) =>{
        if(err){
            res.redirect('/');
        } else{
            if (user == null){
                res.redirect('/');
            } else{
                res.render('edit_users', { title: "Edit User Page", user: user,});
            }
        }
    });
});

// Update users
router.post('/update/:id', (req, res)=> {
    let id = req.params.id;
    User.findByIdAndUpdate( id, { 
        name : req.body.name, 
        email : req.body.email, 
        age : req.body.age, 
        phone : req.body.phone, 
        address : req.body.address, 
    }, (err, result) => { 
        if(err){
            res.json({ message: err.message, type: "danger"});
        } else{
            req.session.message = {
                type : "success",
                message : "User Updated Successfully!!!",
            };
            res.redirect('/');
        }
    });
});

// Delete User Route
router.get('/deleteUser/:id', (req, res) =>{
    let id = req.params.id;
    User.findByIdAndRemove(id, (err, result) => {
        if(err){
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type : "info",
                message : "User Deleted Successfully!!!",
            };
            res.redirect('/');
        }
    });
});

router.get("/add", (req, res) => {
    res.render('add_users', { title: 'Add Users' }); // taking variable from ejs file
});

module.exports = router;