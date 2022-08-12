const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productController = require('../controllers/productController.js');

router.get('/addProduct', productController.addProduct);
router.post('/addProduct', productController.addProduct);
router.get('/productList', productController.productList);
router.post('/productsList', productController.productsList);
router.get('/editProduct/:id', productController.editProduct);
router.post('/update2/:id', productController.update);
router.post('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;