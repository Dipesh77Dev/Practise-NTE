const express = require('express');
const router = express.Router();
const Product = require('../models/product.js');

// Getting addProduct Form
router.get("/addProduct", (req, res) => {
    res.render('add_product', { title: 'Add Product Form' }); 
});

module.exports = router;
// module.exports = router();