const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const authUserSchema = new mongoose.Schema({
    email: {
      type: String,
      // required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate : [isEmail, 'Please enter an valid Email']
      // [(val) => {}, 'Please enter an valid Email']
    },
    username: {
        type: String,
        required: [true, "Please enter your username"],
        minlength: [6, 'Minimum username length should be at least 6 characters']
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [5, 'Minimum password length should be at least 5 characters'],
    }
  });

/*
// fire a function after doc saved to db
authUserSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc);
    next();
});
  
// fire a function before doc saved to db
authUserSchema.pre('save', function (next) {
    console.log('user was about to be created & saved', this);
    next();
});
*/

authUserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
authUserSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const authUser = mongoose.model('authUserSchema', authUserSchema); // 1st one is the name of the collection it should be singular only, In mongodb, mongoose will look and make in plural form.
  
module.exports = authUser;