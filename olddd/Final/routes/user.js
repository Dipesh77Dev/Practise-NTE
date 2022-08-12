// const controller = require('../controller/user.js');

const db = require('../model/db.js');
const User = db.userSchema;

const router=require('express').Router();

// Showing Home Page
router.get('/', function (req, res) {
    res.render('register', {
    title: 'Registration Page',
    name: '',
    email: '',
    password: ''    
    })
});

// Showing page 
router.get('/home', isLoggedIn, function (req, res){
    res.render("home");
}); 

// Showing Register form
router.get('/register', function (req, res){
    res.render('register', {
    title: 'Registration Page',
    name: '',
    email: '',
    password: ''    
    })
});

// Handling registration/Signup Form
router.post('/addRegister', function (req, res) {
    var email = req.body.email
    var password = req.body.password
    User.register(new User({ email: email }),
    password, function (err, user) {
    if (err) {
    console.log(err);
    return res.render("register");
    }
    passport.authenticate("local")(
    req, res, function () {
    req.flash('success', 'You have logged in')
    res.render("home");
    });
    });
});

// Show Login Form
router.get('/login',  function (req, res) {
    res.render('login', {
    title: 'Login',
    email: '',
    password: ''     
    })
});

// Handle Login Form
router.post('/addLogin', passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
    }), function (req, res) {
});

// Handle user logout 
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect("/");
});
    
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
};

/*
router.put('/:id',controller.update);
router.delete('/:id',controller.deleteById);
router.delete('/',controller.deleteAll);
// router.get('/:id',controller.findById);
*/ 

exports.router = router;

/*
express-flash
Flash is an extension of connect-flash with the ability to define a flash message and render it without redirecting the request.

express-session
Express.js uses a cookie to store a session id.

body-parser
Body-parser allows express to read the body and then parse that into a JSON object that we can understand.

Passport
Passport is authentication middleware for Node. js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

Mongoose
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
*/