const Product = require("../models/product.js");

// Getting addProduct Form
module.exports.addProduct = (req, res) => {
  res.render("add_product", { title: "Add Product Form" });
};

// insert Product
module.exports.addProduct = (req, res) => {
  const product = new Product({
    prodName: req.body.prodName,
    prodPrice: req.body.prodPrice,
    prodDescription: req.body.prodDescription,
    category: req.body.category,
  });
  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ message: err.message, type: "danger" });
    });
};

module.exports.productList = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const product = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "category",
        select: ["catName", "catDescription"],
      });
    // res.send(product);
    res.render("products_list", { title: "Product List", products: product });
  } catch (error) {
    console.log(error);
  }
};

module.exports.productsList = (req, res) => {
  Product.find()
    .then((data) => {
      res.render("product_list", { title: "All products List", product: data });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
};

// Update or edit Product
module.exports.editProduct = (req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, product) =>{
        if(err){
            res.redirect('/productsList');
        } else{
            if (product == null){
                res.redirect('/productsList');
            } else{
                res.render('edit_product', { title: "Edit Product Page", product: product});
            }
        }
    });
};

// Update product by post
module.exports.update = (req, res)=> {
    let id = req.params.id;
    Product.findByIdAndUpdate( id, { 
        prodName : req.body.prodName, 
        prodPrice : req.body.prodPrice,
        prodDescription : req.body.prodDescription,
        category : req.body.category,
    }, (err, result) => { 
        if(err){
            res.json({ message: err.message, type: "danger"});
        } else{
            req.session.message = {
                type : "success",
                message : "Product Updated Successfully!!!",
            };
            res.redirect('/productsList');
        }
    });
};

// Delete Product Route
module.exports.deleteProduct = (req, res) =>{
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, result) => {
        if(err){
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type : "info",
                message : "Product Deleted Successfully!!!",
            };
            res.redirect('/productsList');
        }
    });
};