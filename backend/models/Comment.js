const mongoose = require('mongoose')
const Blog = require('./Blog')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    article:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    comments:{
        type:[
            {
            id:String,
            comment:String,
            commentBy:{type:Schema.Types.ObjectId,ref:"User"},
            commentTo:{type:Schema.Types.ObjectId,ref:"User"},
            commentTime: {type:Date,default:Date.now}
            }
        ]
    }
})

commentSchema.post('save',async function(doc){
   
    let blog =await Blog.findById(this.article).exec()
        blog.comments = this.comments.length
        await blog.save()
        
})

module.exports = mongoose.model('Comment',commentSchema)