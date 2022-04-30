const express = require('express');
const router = express.Router();
const Category = require('../models/category.js');

// Getting addCategory Form
router.get("/addCategory", (req, res) => {
    res.render('add_category', { title: 'Add Category FORM' }); // taking variable from ejs file
});

// insert Category 
router.post("/addCategory", (req, res) => {
    const category = new Category({
        catName : req.body.catName,
        catDescription : req.body.catDescription,
    });
    category.save((err) => {
        if(err){
            res.json({message : err.message, type: 'danger'});
        } else {
            req.session.message = {
                type: 'success',
                message: 'Category added successfully!!!',
            };
            res.redirect('/categoryList');
        }
    });
});

// Get Category List
router.get("/categoryList", (req, res) => {
    Category.find().exec((err, category) => {
        if(err){
            res.json({ message: err.message });
        } else {
            res.render('category_list', { title: 'Category List Page' , category: category});
        }
    });
});

// Update or edit Category
router.get('/editCategory/:id', (req, res) => {
    let id = req.params.id;
    Category.findById(id, (err, category) =>{
        if(err){
            res.redirect('/');
        } else{
            if (category == null){
                res.redirect('/categoryList');
            } else{
                res.render('edit_category', { title: "Edit Category Page", category: category});
            }
        }
    });
});

// Update category by post
router.post('/update1/:id', (req, res)=> {
    let id = req.params.id;
    Category.findByIdAndUpdate( id, { 
        catName : req.body.catName, 
        catDescription : req.body.catDescription, 
    }, (err, result) => { 
        if(err){
            res.json({ message: err.message, type: "danger"});
        } else{
            req.session.message = {
                type : "success",
                message : "Category Updated Successfully!!!",
            };
            res.redirect('/categoryList');
        }
    });
});

// Delete Category Route
router.get('/deleteCategory/:id', (req, res) =>{
    let id = req.params.id;
    Category.findByIdAndRemove(id, (err, result) => {
        if(err){
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type : "info",
                message : "Category Deleted Successfully!!!",
            };
            res.redirect('/categoryList');
        }
    });
});

module.exports = router;