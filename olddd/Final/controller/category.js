const db = require('../model/db.js')
const Category = db.categorySchema

exports.create =(req, res) => {
    // res.json("create")
    const category = new Category({
        catId : req.body.catId,
        catName: req.body.catName,
        catDesc: req.body.catDesc
    })
    category.save(category).then(
        data => {
            res.send(data); 
        }
    ).catch(
        err =>{
            res.status(500).send(err)
        })
}

exports.find =(req, res) => {
    Category.find().then(
        data => {
            res.render('category' , {"category":data}); 
            // res.send(data)
        }
    ).catch(
        err =>{ 
            res.status(500).send(err)
        })
}

// exports.findByID=(req,res)=>{
//     Category.findById(req.params.id).then(
//         data=>{
//             res.send(data)
//         }
//     ).catch(
//         err=>{
//             res.status(500).send(err)
//         }
//     )
// }

exports.update =(req, res) => {
    // res.json("update")
    Category.findByIdAndUpdate(req.params.id, req.body).then(
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
    Category.findByIdAndRemove(req.params.id, req.body).then(
        data => {
            if(!data){
                res.send("No data has been found");
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
    Category.deleteMany({}).then(
        data => {
            res.send(data+ "documents deleted")
        }
    ).catch(
        err =>{
            res.status(500).send(err)
        })
}