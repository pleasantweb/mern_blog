const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    likedArticles:{
        type:[Schema.Types.ObjectId],
        ref:'Blog'
    },
    savedArticles:{
        type:[Schema.Types.ObjectId],
        ref:'Blog'
    }
})

module.exports = mongoose.model('UserProfile',userProfileSchema)