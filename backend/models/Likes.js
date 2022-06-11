const mongoose = require('mongoose')
const Blog = require('./Blog')
const UserProfile = require('./UserProfile')
const Schema = mongoose.Schema

const likeSchema = new Schema({
    article:{
        type:Schema.Types.ObjectId,
        ref:'Blog'
    },
    likesBy:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'User'
        }]
    }
})

likeSchema.post('save',async function(doc){
   
    let blog =await Blog.findById(this.article).exec()
        blog.likes = this.likesBy.length
        await blog.save()
        
    let userProfile = await UserProfile.findOne({user:this.likesBy[0]}).exec()
        if(userProfile){
            let art=userProfile.likedArticles.indexOf(this.article)
            if(art === -1){
                userProfile.likedArticles.push(this.article)
                await userProfile.save()
            }
        }
    
})

module.exports = mongoose.model('Likes',likeSchema)