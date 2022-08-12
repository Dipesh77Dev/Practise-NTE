const express = require('express'); // importing express
const category = require('./data/category.js'); //normal data calling from local
const dotenv = require('dotenv'); // importing .dotenv 
const dbConnect = require('./config/db.js'); // importing dbconfig file

// importing Routes file -
const userRoutes = require('./routes/userRoutes.js');

// importing error handler file - 
const { notFound } = require('./middleware/errorMiddleware.js');

const server = express(); // making one variable to use express
const bodyParser = require('body-parser'); // importing bodyParser
// get data in json 
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
// server.use(express.json());

dotenv.config(); // ready for using .env file
dbConnect(); // this function connect to db

// calling an test api
server.get('/', (req,res) => {
    res.send("Api is running");
})

// calling an data which we store locally
server.get('/api/category', (req,res) => {
    res.json(category); // get error until we dont import; given filename.
})

// calling an single data by params giving as id
server.get('/api/category/:id', (req,res) => {
    const data1 = category.find((a) => a.id === req.params.id);
    // console.log(req.params);
    res.send(data1);
})

/* //  calling an single data by params giving as another data rather than id.
server.get('/api/category/:catName', (req,res) => {
    const data2 = category.find((b) => b.catName === req.params.catName);
    // console.log(req.params);
    res.send(data2);
})
Not running
*/

/* Query
server.get('/api/category', (req,res) => {
    // var id = req.query.id
    const catName = req.query.catName
    var data3 = catName?{catName:{regex:new RegExp(catName)}} : {}
    const catDesc = req.query.catDesc
    res.send(data3);
})
*/

// using Routes
server.use('/api/users', userRoutes);
 
// error handlers
server.use(notFound);
// server.use(errorHandler);

// calling server without port
// server.listen(5000, console.log("server started on Port 5000 ..."));
const PORT = process.env.PORT || 5000; // function connect to port

// calling server with port
server.listen(PORT, console.log(`Server started on Port ${PORT} ...`)); // ` - template string

// .env - used to store all secret things related to our application like password, api Key,etc.

// bcrypt = encrypting password, express-async-handler = For handling errors, jwt = for creating token for user, it certifies user identity & send it to client.