const controller = require('../controller/category.js');

const router=require('express').Router();

router.get('/displayCategory',controller.find);
// router.get('/:id',controller.findById);
router.post('/addCategory',controller.create);
router.put('/:id',controller.update);
router.delete('/:id',controller.deleteById);
router.delete('/',controller.deleteAll);

exports.router = router;