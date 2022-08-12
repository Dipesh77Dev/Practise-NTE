const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product.js');
const { requireAuth } = require('../middlewares/authMiddleware.js');
// const { ObjectId } = require('mongodb'); 

// Getting addProduct Form
router.get("/addProduct", requireAuth, (req, res) => {
    res.render('add_product', { title: 'Add Product Form' }); 
});

// insert Product 
router.post("/addProduct", requireAuth, (req, res) => {
    const product = new Product({
        prodName : req.body.prodName,
        prodPrice : req.body.prodPrice,
        prodDescription : req.body.prodDescription,
        category : req.body.category,
    });
    /*
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
    */
   
    product.save(product).then(
        data => {
            res.send(data);
            // req.session.message = {
            //     type: 'success',
            //     message: 'Product added successfully!!!',
            // };
            // res.redirect('/productsList');
        }
    ).catch(
        err => {
            res.json({message : err.message, type: 'danger'});
        }
    );
});

/*
// Get Product List with pagination & Populate
router.get("/productList", (req, res) => {
    const {page = 1, limit = 5} = req.query;
    const product = Product.find({ category: req.params.categoryId })
    .limit(limit * 1).skip((page - 1) * limit)
    .populate({
        path: 'category',
        select: ['catName', 'catDescription'],
    })
    .exec((err, product) => {
        if(err){
            res.json({ message: err.message });
        } else {
            // res.send(product);
            res.json(product);
            // res.render('product_list', { title: 'Product List Page' , product : product });
        }
    });
});
*/

router.get("/productList", requireAuth, async(req, res) => {
    try{
    const {page = 1, limit = 5} = req.query;
    const product = await Product.find()
    .limit(limit * 1).skip((page - 1) * limit)
    .populate({
        path: 'category',
        select: ['catName', 'catDescription'],
    });
    // res.send(product);
    res.render('products_list', { title: 'Product List', "products" : product});
}
catch(error){
    console.log(error);
}
});

router.get('/productsList', requireAuth, (req, res) => {
    Product.find().then(
        data => {
            res.render('product_list', { title: 'All products List', "product" : data});
        }
    ).catch(
        err =>{
            res.json({ message: err.message });
        }
    )
});

// Update or edit Product
router.get('/editProduct/:id', requireAuth, (req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, product) =>{
        if(err){
            res.redirect('/productsList');
        } else{
            if (product == null){
                res.redirect('/productsList');
            } else{
                res.render('edit_product', { title: "Edit Product Page", product: product});
            }
        }
    });
});

// Update product by post
router.post('/update2/:id', requireAuth, (req, res)=> {
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
            res.redirect('/productsList');
        }
    });
});

// Delete Product Route
router.get('/deleteProduct/:id', requireAuth, (req, res) =>{
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, result) => {
        if(err){
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type : "info",
                message : "Product Deleted Successfully!!!",
            };
            res.redirect('/productsList');
        }
    });
});

// router.get('/', (req, res) =>{
//     res.render('home', {title: 'Home Page'});
// });

module.exports = router;

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
