const mongoose = require('mongoose');

const dbConnect = async() => {
    try{
        // const url = process.env.MONGO_URL
        const url = 'mongodb+srv://Dipesh:admin@cluster0.agjew.mongodb.net/Nimap-CRUD?retryWrites=true&w=majority'
        const conn = await mongoose.connect(url, {
            //must add in order to not get any error messages:
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log(`MongoDb Connected: ${conn}`);
        // console.log(`MongoDB Database Connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Database Not connected : ${err}`);
        process.exit();
    }
};

module.exports = dbConnect;

/*
MongoUrl = mongodb+srv://<username>:<password>@cluster0.agjew.mongodb.net/Db_name?retryWrites=true&w=majority
Change only in place of username and password with our mongodb given username & password; & in place of Db_name give our new database name
*/

/*
const dbConnect = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log(`MongoDb Connected: ${conn}`);
        // console.log(`MongoDB Database Connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Database Not connected : ${err}`);
        process.exit();
    }
};

module.exports = dbConnect;
*/