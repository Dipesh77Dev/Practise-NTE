module.exports =(mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const Product = mongoose.model(
        "product", mongoose.Schema({
            name: String,
            // category: String,
            category: {
                type: ObjectId,
                ref: "category",
                required : true ,
            },
            price: Number,
            description: String,
            image: {
                type: Array,
                required: true
            }
        })
    )
    return Product
}
