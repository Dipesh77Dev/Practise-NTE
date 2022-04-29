const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product.js');

// Getting addProduct Form
router.get("/addProduct", (req, res) => {
    res.render('add_product', { title: 'Add Product Form' }); 
});

// insert Product 
router.post("/addProduct", (req, res) => {
    const product = new Product({
        prodName : req.body.prodName,
        prodPrice : req.body.prodPrice,
        prodDescription : req.body.prodDescription,
        category : req.body.category,
    });
    product.save((err) => {
        if(err){
            res.json({message : err.message, type: 'danger'});
        } else {
            req.session.message = {
                type: 'success',
                message: 'Product added successfully!!!',
            };
            res.redirect('/productList');
        }
    });
});

// Get Product List without pagination & Populate
router.get("/productList", (req, res) => {
    const {page = 1, limit = 5} = req.query;
    Product.find()
    .limit(limit*1).skip((page-1)*limit)
    .populate({
        path: 'category',
        select: ['catName', 'catDescription'],
    })
    .exec((err, product) => {
        if(err){
            res.json({ message: err.message });
        } else {
            res.render('product_list', { title: 'Product List Page' , product: product });
        }
    });
});

/*
// Pagination & Populate
router.get("/", async (req, res) => {
    try{
        // pagination
        const {page = 1, limit = 5} = req.query;
        const product = await Product.find().limit(limit * 1).skip((page-1) * limit).populate({
            path: "category",
            select: [
                'catName',
                'catDesc'
            ],
        }).exec((err, product) => {
            if(err){
                res.send(product);
                // res.json({ message: err.message });
            } else {
                res.render('home', { title: 'Home Page' , product: product });
            }
        });
    });;

        // res.send(product);
        // res.render('home', { title: 'Home Page' , product: product });
    // }
    // catch(err){
    //     res.status(500).send(err)
    // };
// });
*/

// Update or edit Product
router.get('/editProduct/:id', (req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, product) =>{
        if(err){
            res.redirect('/productList');
        } else{
            if (product == null){
                res.redirect('/productList');
            } else{
                res.render('edit_product', { title: "Edit Product Page", product: product});
            }
        }
    });
});

// Update product by post
router.post('/update2/:id', (req, res)=> {
    let id = req.params.id;
    Product.findByIdAndUpdate( id, { 
        prodName : req.body.prodName, 
        prodPrice : req.body.prodPrice,
        prodDescription : req.body.prodDescription,
        category : req.body.category,
    }, (err, result) => { 
        if(err){
            res.json({ message: err.message, type: "danger"});
        } else{
            req.session.message = {
                type : "success",
                message : "Product Updated Successfully!!!",
            };
            res.redirect('/productList');
        }
    });
});

// Delete Product Route
router.get('/deleteProduct/:id', (req, res) =>{
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, result) => {
        if(err){
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type : "info",
                message : "Product Deleted Successfully!!!",
            };
            res.redirect('/productList');
        }
    });
});

router.get('/',(req, res) =>{
    res.render('home', {title: 'Home Page'});
});

module.exports = router;

/*
router.get("/prodCat", async (req, res) => {
    try{
        // pagination
        const {page = 1, limit = 5} = req.query;
        const product = await Product.find().limit(limit * 1).skip((page-1) * limit).populate({
            path: "category",
            select: [
                'catName',
                'catDescription'
            ],
        });
        res.send(product);
        res.render('prod_cat', { title: 'Product Page by Category' , product: product });
    }
    catch(err){
        res.status(500).send(err)
    };
});
*/

/*
router.get("/prodCat", (req, res) => {
    const {page = 1, limit = 5} = req.query;
    Product.find().limit(limit * 1).skip((page-1) * limit).populate({
                    path: "category",
                    select: [
                        'catName',
                        'catDescription'
                    ],
                }).exec((err, product) => {
        if(err){
            res.json({ message: err.message });
        } else {
            res.render('prod_cat', { title: 'Product by Category Page' , product: product });
        }
    });
});
*/

// module.exports = router(); 