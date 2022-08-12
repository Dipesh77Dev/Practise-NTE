const express = require("express");
const router = express.Router();
const User = require("../models/users.js"); // Model Schema
const multer = require("multer"); // For image
const fs = require('fs');

// image upload
// var storage = multer.diskStorage({
//     destination : function(req, file, cb){
//         cb(null, './uploads');
//     }, 

//     filename: function(req, file, cb){
//         cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname); 
//     },
// });

// var upload = multer({
//     storage: storage,
// }).single('image'); // for uploading single image - getting image from adduser.ejs in image

// insert an user 
// router.post('/add', upload, (req, res) 
router.post('/add', (req, res)=> {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        // image: req.body.filename, // filename coming from above function; User - is an modelSchema
    });
    user.save((err) => {
        if(err){
            res.json({ message: err.message, type: "danger"});
        } else{
            req.session.message = {
                type: "success",
                message: "User added successfully!!"
            };
            res.redirect('/');// coming from middleware we session in server.js
        }
    })
});

// Routes

router.get("/", (req, res) => {
    // res.send("Home Page!!!");
    // res.render('home', { title: "Home Page" });

    // Get all users routes - 
    User.find().exec((err, users) =>{
        if(err){
            res.json({message: err.message});
        } else{
            res.render("home", {
                title: "Home Page",
                users: users,
            });
        }
    });
});

router.get("/add", (req, res) => {
    // res.send("Home Page!!!");
    res.render('add_user', { title: "Add User Page"});
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
                res.render('edit_user', 
                { 
                    title: "Edit User Page",
                    user: user,
                });
            }
        }
    });
});

// Update users
// router.post('/update/:id', upload, (req, res) 
router.post('/update/:id', (req, res)=> {
    let id = req.params.id;
    // let new_image = "";
    
    // if(req.file){
    //     new_image = req.file.filename;
    //     try{
    //         fs.unlinkSync('./uploads/' + req.body.old_image);
    //     } catch(err){
    //         console.log(err);
    //     }
    // } else{
    //     new_image = req.body.old_image;
    // }

    User.findByIdAndUpdate( id, { 
        name : req.body.name, 
        email : req.body.email, 
        phone : req.body.phone, 
        address : req.body.address, 
        // image : new_image,
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

        // if(result.image != ''){
        //     try{
        //         fs.unlinkSync('./uploads/' + result.image);
        //     } catch(err){
        //         console.log(err);
        //     }
        // }

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

// router.get("/users", (req, res) => {
//     res.send("All Users!!!");
// });

module.exports = router;

// find by Id - method of mongoose.