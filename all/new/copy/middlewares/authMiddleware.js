const jwt = require('jsonwebtoken');
const User = require('../models/authUser.js');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'DBUSER', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/auth/authLogin');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/auth/authLogin');
  }
};

/*
// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'DBUSER', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
*/

// module.exports = { requireAuth, checkUser };
module.exports = { requireAuth };