const mongoose = require('mongoose');

// const { ObjectId } = mongoose.Schema.Types;
const productSchema = new mongoose.Schema({
    prodName : {
        type : String,
    },
    prodPrice : {
        type : Number, 
    },
    prodDescription : {
        type : String,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "category",
        required : true,
    },
});

module.exports = mongoose.model("Product", productSchema);