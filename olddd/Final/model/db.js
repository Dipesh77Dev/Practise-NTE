const dbConfig = require('../config/mongo.js');

const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.url = dbConfig.url;

db.productSchema = require('./productSchema.js')(mongoose);
db.categorySchema = require('./categorySchema.js')(mongoose);
// db.userSchema = require('./userSchema.js')(mongoose);

module.exports = db;