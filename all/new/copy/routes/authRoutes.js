const { Router } = require('express');
const authController = require('../controller/authController.js');

const router = Router();

// router.post('/authSignup', () => {});
// router.post('/authLogin', () => {});
// router.get('/authSignup', () => {});
// router.get('/authLogin', () => {});

router.post('/authSignup', authController.authSignup_post);
router.post('/authLogin', authController.authLogin_post);
router.get('/authSignup', authController.authSignup_get);
router.get('/authLogin', authController.authLogin_get);
router.get('/authLogout', authController.logout_get);

module.exports = router;