const express = require('express');
const { registerUser, loginUser } = require('../controller/userController.js');
const router = express.Router(); // importing router from express

router.route('/register').post(registerUser); // Route is basically an Api endpoint, we are storing the data in backend so we will use POST req.
router.route('/login').post(loginUser);

module.exports = router;