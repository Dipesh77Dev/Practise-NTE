const db = require('../models/db.js')
const User = db.userSchema

exports.create =(req, res) => {
    // res.json("create")
    const user = new User({
        // id : req.body.id,
        name : req.body.name,
        // username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        // phoneNo : req.body.phoneNo,
        // address : req.body.address
    })
    user.save(user).then(
        data => {
            res.send(data); 
        }
    ).catch(
        err =>{
            res.status(500).send(err)
        })
}


exports.find =(req, res) => {
    User.find().then(
        data => {
            res.send(data);
        }
    ).catch(
        err =>{ 
            res.status(500).send(err)
        })
}

exports.update =(req, res) => {
    // res.json("update")
    User.findByIdAndUpdate(req.params.id, req.body).then(
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
    User.findByIdAndRemove(req.params.id, req.body).then(
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
    User.deleteMany({}).then(
        data => {
            res.send(data+ "documents deleted")
        }
    ).catch(
        err =>{
            res.status(500).send(err)
        })
}

