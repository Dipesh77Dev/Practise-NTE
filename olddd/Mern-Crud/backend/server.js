// importing library

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

// We would then call our express app and will set it to use it in our application.

const app = express();
app.use(express.json());

// setting the server file to serve static content which will be generated from React app in production. This will only work in the production environment. 
// used in production to serve client files

if(process.env.NODE === "production"){
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', ' build', 'index.html'));
    });
}

// Configure our server file to connect to the MongoDB database and then start running the server to listen to our requests on port 4000. Mongoose returns a promise
// connecting to mongoDB and then running server on port 4000

const dbURI = require('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
})
.then((result) => app.listen(port))
.catch((err) => console.error(err))

