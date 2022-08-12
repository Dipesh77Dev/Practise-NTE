module.exports = (mongoose) => {
    const Category = mongoose.model(
        'category', mongoose.Schema({
            catId : Number,
            catName : String,
            catDesc : String
        },{
            timestamps : true,
        }))
        return Category
}