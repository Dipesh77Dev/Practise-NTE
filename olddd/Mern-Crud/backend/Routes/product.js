const { Router } = require('express');
const productController = require('../controller/productController.js');
const router = Router();

router.get('/displayProducts', productController.get_products);
router.post('/addProducts',productController.post_product);
router.put('/products/:id',productController.update_product);
router.delete('/products/:id',productController.delete_product);

module.exports = router;