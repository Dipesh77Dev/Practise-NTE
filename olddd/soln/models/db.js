const dbConfig = require('../config/db.mongo.js');
const mongoose = require('mongoose');
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// Schema
db.productSchema = require('./productSchema.js')(mongoose);
db.categorySchema = require('./categorySchema.js')(mongoose);
db.userSchema = require('./userSchema.js')(mongoose);

module.exports = db;