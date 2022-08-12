const { Router } = require('express');
const authController = require('../controller/authController.js');
const auth = require('../middleware/auth.js');
const router = Router();

router.post('/register', authController.signup);
router.post('/login', authController.login);
router.post('/user', auth, authController.get_user);

module.exports = router;