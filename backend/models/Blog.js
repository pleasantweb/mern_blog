const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        required:true,
        type:String
    },
    category:{
        type:String,
        enum:[ "world",
        "technology",
        "design",
        "culture",
        "business",
        "politics",
        "opinion",
        "science",
        "health",
        "style",
        "travel"],
        default:'world'
    },
    blogImage:String,
    content:String,
    datePosted:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:['draft','publish'],
        default:'draft'
    },
    likes:{
     type:Number,
     default:0  
    },
    comments:{
        type:Number,
        default:0
    }
    
})

module.exports = mongoose.model('Blog',blogSchema)