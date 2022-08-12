const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const categoryController = require('../controllers/categoryController.js');

router.get('/addCategory', categoryController.addCategory);
router.post('/addCategory', categoryController.addCategory);
router.get('/categoryList', categoryController.categoryList);
router.get('/editCategory/:id', categoryController.editCategory);
router.post('/update1/:id', categoryController.update);
router.post('/deleteCategory/:id', categoryController.deleteCategory);

module.exports = router;