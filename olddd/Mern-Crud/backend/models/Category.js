const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    catName : {
        type : String,
        required : true
    },
    catDescription : {
        type : String,
        required : true
    },
    catDate_added : {
        type : Date,
        default : Date.now
    }
}); 

module.exports = Category = mongoose.model('category', CategorySchema);
