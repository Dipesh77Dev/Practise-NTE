// console.log("Starting");

const express = require('express');
const mongoose = require("mongoose");
const server = express();
// server.use(express.json());
const bodyParser = require( 'body-parser' );
server.use(bodyParser.urlencoded({ extended: true }));

// auth  
const User = require('./model/userSchema.js') 
const passport = require("passport");

var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

server.use(require("express-session")({
    secret: "node js mongodb",
    resave: false,
    saveUninitialized: false
    }));
    
server.use(passport.initialize());
server.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// db route
const db = require('./model/db.js');

// Router paths
const productRouter = require('./routes/product.js');
const categoryRouter = require('./routes/category.js');
const userRouter = require('./routes/user.js');

// server.use( cors() );

// rendering template
server.set('view engine', 'ejs');

/* For image
server.use( express.static( __dirname ) );
server.use( express.json( { limit: "50mb" } ) );
server.use( express.urlencoded( { extended: false } ) );
*/

// mongodb connected or not
db.mongoose.connect(
    db.url,
).then(()=>{
   console.log('MongoDb connection has been successfully done');
   server.listen(3005, () => {
    console.log("Server has been started at port 3005");
});
}).catch(
    err => {
        console.log('MongoDb connection failed', err);
    }
);

server.get("/",(req, res) => {
    res.send("API is working :)");
});

server.use('/api/product', productRouter.router);
server.use('/api/category', categoryRouter.router);
server.use('/api/user', userRouter.router);

// server.listen(3001, () => {
//     console.log("Server is listening on port 3001 :)");
// });