// imports
require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

// db connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database has been connected'));

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(
    session({
        secret : "Secret Key",
        saveUninitialized : true,
        resave : false,
    })
);

app.use((req, res, next) =>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// set template engine 
app.set('view engine', 'ejs');

app.get('/welcome', (req, res) => {
    res.send("Hello ALL!!");
});

// models
require('./models/users.js');
require('./models/product.js');
require('./models/category.js');

// route prefix or calling routes

app.use("", require("./routes/userRoutes.js"));
app.use("", require("./routes/categoryRoutes.js"));
app.use("", require("./routes/productRoutes.js"));

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});