const db = require('../models/db.js')
const Product = db.productSchema

exports.create =(req, res) => {
    // res.json("create") 
    const product = new Product({
        name: req.body.name,
        category : req.body.category,
        price : req.body.price,
        description: req.body.description,
        // image : req.file.path
    })
    // console.log("image" , req , req.file , req.file.path)
    product.save(product).then(
        data => {
            res.send(data);
        }
    ).catch(
        err =>{
            res.status(500).send(err)
        })
}

exports.findAll = async(req, res) => {
    try{   
        // pagination 
        const { page = 1, limit = 5} = req.query;
        const product = await Product.find().limit(limit * 1).skip((page - 1) * limit).populate({
            path: 'category',
            select: ['categoryName', 'description'],
        });

        // rendering by populate & pagination
        res.render('product' , {"product": product});
    }
    catch(err){
        console.log(err);
        // res.status(500).json(e)
    } 
    // console.log(query);
}
           
// without pagination & populate
exports.findAllProduct =(req, res) => {
    Product.find().then(
        data => {
            // rendering all product without pagination & populate
            res.render('product' , {"product":data}); 
            // res.send(data)
        }
    ).catch(
        err =>{ 
            res.status(500).send(err)
        })
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

// 24 - exports.findAll = async(req, res) => { 
// res.status(200).send(product);
// res.status(200).json(product);
/*let { page, size } = req.query;
if(!page){
     page = 1
        }
if(!size){
     size = 5
        }
        
const limit = parseInt(size);
const skip = (page - 1) * size;

const product = await Product.find({},{},{limit: limit, skip: skip}) Query,projection
const product = await Product.find().limit(limit).skip(skip)
*/

// populate
//     const populate = await Product.find().populate({
//     path: 'category',
//     select: ['categoryName', 'description'],
 // })
  