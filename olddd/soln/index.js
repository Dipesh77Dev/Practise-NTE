const express = require('express');
const server = express();

// setting routes
const db = require('./models/db.js')
const productRouter = require('./router/product.js');
const categoryRouter = require('./router/category.js');
const userRouter = require('./router/user.js');

const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );

server.use( cors() );
server.set('view engine', 'ejs');

// server.use( 'public/data/uploads', express.static( 'public' ) )
server.use( express.static( __dirname ) );
server.use( express.json( { limit: "50mb" } ) );
server.use( express.urlencoded( { extended: false } ) );

db.mongoose.connect(
    db.url,
).then(()=>{
   console.log('MongoDb connection has been successfully done');
   server.listen(3000, () => {
    console.log("Server has been started at port 3000");
});
}).catch(
    err => {
        console.log('MongoDb connection failed', err);
    }
);

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Welcome All!!!");
})

// calling routes
server.use('/product', productRouter.router);
server.use('/category', categoryRouter.router);
server.use('/user', userRouter.router);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// authentication

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('./middleware/auth.js');
const User = require('./models/userSchema.js');

// app.use(express.json({ limit: "50mb" }));

// Register
server.post('/register', async (req, res) => {
    try {
      // Get user input
      const { name, email, password } = req.body;
      console.log(req.body);
      // Validate user input
      if (!(email && password && name )) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      /*
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      */
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      /*
      const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword
      });
      */

      const user = new User( { name , email , 'password' : encryptedPassword } );
      try
      {
          const data = await user.save()
          res.json( data );
      }
      catch ( err )
      {
          res.json( { message: err } );
      }

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
          "Dipesh",
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });

// Login
server.post("/login", async (req, res) => {
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });

// Normal Welcome Message
server.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌");
});

// Error 
server.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      }, 
    });
  });

module.exports = server;