const db = require('../model/db.js');
const Product = db.productSchema

exports.create = async(req,res) => {
    try{
        const product = await new Product({
            prodId : req.body.prodId,
            prodName : req.body.prodName,
            prodPrice : req.body.prodPrice,
             prodDesc : req.body.prodDesc
            // image : req.file.path
        })
        product.save(product).then(
            data => {
                res.send(data);
            }
        ).catch(
            err => {
                res.status(500).send(err)
            }
        )
    }
    catch(err){
        console.log(err);
        // res.status(500).json(e);
    }
} 

exports.findAll = async(req, res) => {
    try{
        // pagination
        const {page = 1, limit = 5} = req.query;
        const product = await Product.find().limit(limit*1).skip((page-1)*limit).populate({
            path: 'category',
            select: ['catId', 'catName', 'catDesc'],
        });
        // rendering by populate & pagination
        // res.render('product' , {"product": product});
        res.send(product);
    }catch(err) {
        console.error(err);
        // res.status(500).json(e);
    }
    // console.log(query);
}

exports.findAllProduct = async(req, res) =>{
    try{
        const product = await Product.find();
        res.send(product);
        // rendering all product without pagination & populate
        res.render('product' , {"product":data}); 
        // res.send(data)
        }
    catch(err){
            res.status(500).send(err)};
}

exports.update =(req, res) => {
    // res.json("update")
    Product.findByIdAndUpdate(req.params.id, req.body).then(
        data =>{
            res.send(data);
        }
    ).catch(
        err => {
            res.status(500).send(err)
        })
}

exports.deleteById =(req, res) => {
    // res.json("deleteById")
    Product.findByIdAndRemove(req.params.id).then(
        data => {
            if(!data){
                res.send("No data/id has been found");
            }else{
            res.send(data + "documents deleted")
        }}
    ).catch(
        err =>{
            res.status(500).send(err)
        })
}

exports.deleteAll =(req, res) => {
    // res.json("deleteAll")
    Product.deleteMany({}).then(
        data => {
            res.send(data+ "documents deleted")
        }
    ).catch(
        err =>{
            res.status(500).send(err)
        })
}

// exports.findByID=(req,res)=>{
//     Product.findById(req.params.id).then(
//         data=>{
//             res.send(data)
//         }
//     ).catch(
//         err=>{
//             res.status(500).send(err)
//         }
//     )
// }