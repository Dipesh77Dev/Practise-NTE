const controller = require('../controller/product.js');
const multer  = require('multer')
const router = require('express').Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

router.get('/displayProduct',controller.findAll);
router.get('/displayAllProduct',controller.findAllProduct);
// router.get('/:id',controller.findById);
router.post('/addProduct',upload.single('image'),controller.create);
router.put('/:id',controller.update);
router.delete('/:id',controller.deleteById);
router.delete('/',controller.deleteAll);

exports.router = router;