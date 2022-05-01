const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const { ObjectId } = mongoose.Schema.Types;
const productSchema = new Schema({
    prodName : {
        type : String,
    },
    prodPrice : {
        type : Number, 
    },
    prodDescription : {
        type : String,
    },
    category: {
        type : Schema.Types.ObjectId, 
        ref : "category",
        // required : true,
    },
});

module.exports = mongoose.model("Product", productSchema);


/*
const mongoose = require('mongoose');
module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const Product = mongoose.model(
        "product", mongoose.Schema({
            prodName: String,
            prodPrice: Number,
            prodDescription: String,
            category: {
                type: ObjectId,
                ref: "category",
                required : true ,
            },
        })
    )
    return Product
}
*/