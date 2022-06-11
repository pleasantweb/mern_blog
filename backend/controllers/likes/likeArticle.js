const UserProfile = require('../../models/UserProfile')

const Likes = require("../../models/Likes")

const allLikes = async(req,res)=>{
   try{
      console.log('all likes');
      const All_likes = await Likes.find()
      console.log(All_likes);
      res.status(200).json(All_likes)
   }catch(err){
      res.status(500).json(err.message)
   }
}


const likeArticle=async(req,res)=>{
   console.log('req user',req.user);
   try{
      const {article,user} = req.body
      
      const articleExits = await Likes.findOne({article:article}).exec()
     
      if(!articleExits){
         
         const newLike =await Likes.create({
            article:article,
            likesBy:[user]
           })
          return res.status(201).json({'Success':newLike})
      }
      
      if(articleExits.likesBy.indexOf(user) === -1){
         articleExits.likesBy.push(user)
         await articleExits.save()
         return res.status(200).json({'success':"done"})
      }
      
      
   }catch(err){
      res.status(500).json(err.message)
   }
   
   
}


const unlikeArticle = async(req,res)=>{
    try{
      const {article,user} =req.body
      const findArticle = await Likes.findOne({article:article})
      if(!findArticle) return res.status(400).json({"error":"No article Found"})
     
      const index = findArticle.likesBy.indexOf(user)
     
       findArticle.likesBy.splice(index,1)
      await findArticle.save()

    
      res.status(200).json({"success":"unliked successuflly"})
    }catch(err){
      res.status(500).json(err.message)
    }
}

const likedArticles = async(req,res)=>{
   console.log('hai to id',req.user.Likesuser_id);
   try{
      const profile = await UserProfile.findOne({user:req.user.user_id}).exec()
      if(profile) return res.status(200).json(profile.likedArticles)
      res.status(400).json({"error":"No user found"})
   }catch(err){
      res.status(500).json(err.message)
   }
}


module.exports = {likeArticle,unlikeArticle,allLikes,likedArticles}