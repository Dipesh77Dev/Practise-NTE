module.exports =(mongoose) => {
    const Category = mongoose.model(
        "category", mongoose.Schema({
            categoryName: String,
            description: String,
        })
    )
    return Category
}