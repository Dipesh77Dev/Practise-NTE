const authUser = require("../models/authUser.js");
const jwt = require('jsonwebtoken');

// handle errors -
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', email: '', password: '' };

  // incorrect username
  if (err.message === 'incorrect username') {
    errors.username = 'That username is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

    // duplicate email error or duplicate key error status code : 11000
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
    return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'DBUSER', { // 1st - payload(id), wnd - secret
    expiresIn: maxAge
  });
};

// controller actions
module.exports.authSignup_post = async (req, res) => {
    // res.send("Signup");
    const { email, username, password } = req.body; // it will give error if we give another names like phone, address, etc which are not present in destructing while sending data in postman.
    try {
        const user = await authUser.create({ email, username, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
        // res.status(201).json(user);
        res.status(201).json({user: user._id});
      }
      catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
        /* console.log(err);
        res.status(400).send('error, User is not created or not given data in proper format'); */
      }
}

module.exports.authLogin_post = async (req, res) => {
    /*
    console.log(req.body); // when we are sending in json format
    res.json(req.body); // to see data in json
    const { email, password } = req.body; // Destructing
    console.log(email, password);
   */
    // res.send("Login");
    const { username, password } = req.body;

    try {
      const user = await authUser.login(username, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.authSignup_get = (req, res) => {
    res.render("signup", {title: "SignUp Page"});
}

module.exports.authLogin_get = (req, res) => {
    res.render("login", {title: "Login Page"});
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/home');
}