const { default: mongoose } = require("mongoose");

module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const Product = mongoose.model(
        "product", mongoose.Schema({
            prodId : Number,
            prodName : String,
            prodPrice : Number,
            prodDesc : String, 
            category: {
                type: ObjectId,
                ref: "category",
                required : true
            },  
            // image: {
            //     type : Array,
            //     required: true
            // }
        },{
            timestamps : true
        })
    )
    return Product
}