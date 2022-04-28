const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    catName : {
        type : String,
    },
    catDescription : {
        type : String,
    },
});

module.exports = mongoose.model("Category", categorySchema);