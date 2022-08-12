const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    catName : {
        type : String,
    },
    catDescription : {
        type : String,
    },
});

module.exports = mongoose.model("Category", categorySchema);