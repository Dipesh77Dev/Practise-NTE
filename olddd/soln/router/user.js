const controller = require('../controller/user.js');

const router=require('express').Router();

router.get('/displayUser',controller.find);
// router.get('/:id',controller.findById);
router.post('/addUser',controller.create);
router.put('/:id',controller.update);
router.delete('/:id',controller.deleteById);
router.delete('/',controller.deleteAll);

exports.router = router;