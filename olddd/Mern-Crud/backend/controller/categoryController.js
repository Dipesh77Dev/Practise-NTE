const Category = require('../models/Category.js');

module.exports.get_category = (req,res) => {
    Category.find().sort({date:-1}).then(category => res.json(category));
}

module.exports.post_category = (req,res) => {
    const newCategory = new Category(req.body);
    newCategory.save().then(category => res.json(category));
}

module.exports.update_category= (req,res) => {
    Category.findByIdAndUpdate({_id: req.params.id},req.body).then(function(category){
        Category.findOne({_id: req.params.id}).then(function(category){
            res.json(category);
        });
    });
}

module.exports.delete_category = (req,res) => {
    Category.findByIdAndDelete({_id: req.params.id}).then(function(category){
        res.json({success: true});
    });
}