const mongoose = require('mongoose')
const {DATABASE_URI} = process.env
const connectDB=async()=>{
    try{
        await mongoose.connect(DATABASE_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
    }catch(err){
       console.log(err);
    }

}

module.exports = connectDB