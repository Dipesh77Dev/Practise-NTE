const usersController = require("../controller/users.controller.js");

const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/user-Profile", usersController.userProfile);
router.get('/home', usersController.home);

module.exports = router;