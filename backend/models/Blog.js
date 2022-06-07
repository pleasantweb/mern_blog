const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        required:true,
        type:String
    },
    blogImage:String,
    content:String,
    datePosted:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:['draft','upload'],
        default:'draft'
    },
    reaction:{
        thumbsUp:Number,
        heart:Number,
        wow:Number,
        rocket:Number,
        coffee:Number
    }
})

module.exports = mongoose.model('Blog',blogSchema)