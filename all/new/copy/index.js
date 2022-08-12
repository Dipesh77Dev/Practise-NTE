// imports
require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const unless = require('express-unless');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());

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

// middlewares auth Routes
// const auth = require("./middlewares/auth.js");
// const errors = require("./middlewares/errors.js");

// const { requireAuth, checkUser } = require("./middlewares/authMiddleware.js");
const { requireAuth } = require("./middlewares/authMiddleware.js")

// set template engine 
app.set('view engine', 'ejs');

app.get('/welcome', (req, res) => {
    res.send("Hello ALL!!");
});

// app.get('/home', requireAuth, (req, res) => {
//     res.render("home", {title : "Home Page"});
// });
app.get('/home', (req, res) => {
    res.render("home", {title : "Home Page"});
});

// app.get('*', checkUser); // for all routes

// models
require('./models/users.js');
require('./models/product.js');
require('./models/category.js');

// route prefix or calling routes
app.use("", require("./routes/userRoutes.js"));
app.use("", require("./routes/categoryRoutes.js"));
app.use("", require("./routes/productRoutes.js"));

/*
// middlewares for authenticated token 
auth.authenticateToken.unless = unless; // We are adding unless for not checking auth for this 2 page.
app.use(
    auth.authenticateToken.unless({
        path:[
            { url : "/users/login", methods : ["POST"] },
            { url : "/users/register", methods : ["POST"] },
            { url : "/auth/authSignup", methods : ["POST"] },
            { url : "/auth/authLogin", methods : ["POST"] },
        ],
    })
);
*/

// app.use(errors.errorHandler);

app.use("/users", require("./routes/users.routes.js"));
app.use("/auth", require("./routes/authRoutes.js")); // New authenticated Route

/*
// cookies - Inspect > application, Storage-Cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set-cookies', (req, res) => {
//   res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }); // 1000-ms, 60-s, 60-min, 24hr i.e 1day
    res.send('you got the cookies!');
});

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
//   console.log(cookies)
  console.log(cookies.newUser);
  res.json(cookies);
});
*/

// Server Running
app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});

// const authRoutes = require("./routes/authRoutes.js");
// app.use(authRoutes);

//header.ejs content for displaying name - 
/*
<% if (user) { %>
  <li class="nav-item active"> <%= user.username %></li>
    <li class="nav-item active">
                  <a class="nav-link active"  href="/auth/authLogout"> LOGOUT </a>
                </li>
                <% } else { %>
                <li class="nav-item active">
                  <a class="nav-link active"  href="/auth/authSignup"> SIGNUP </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link active"  href="/auth/authLogin"> LOGIN </a>
                </li>
                <% } %>
*/