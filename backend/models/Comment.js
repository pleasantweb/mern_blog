const mongoose = require('mongoose')
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
            commentTime: {type:Date,default:Date.now()}
            }
        ]
    }
})
module.exports = mongoose.model('Comment',commentSchema)