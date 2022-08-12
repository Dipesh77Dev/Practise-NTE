const { Router } = require('express');
const categoryController = require('../controller/categoryController.js');
const router = Router();

router.get('/displayCategory', categoryController.get_category);
router.post('/addCategory',categoryController.post_category);
router.put('/category/:id',categoryController.update_category);
router.delete('/category/:id',categoryController.delete_category);

module.exports = router;