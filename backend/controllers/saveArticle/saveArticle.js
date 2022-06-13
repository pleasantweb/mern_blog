const UserProfile = require("../../models/UserProfile")


const saveArticle = async(req,res)=>{
    try{
        const {user,article} = req.body
        const profile = await UserProfile.findOne({user:user}).exec()
        if(!profile) return res.status(409).json({"error":"No User found"})
        let saved = profile.savedArticles.indexOf(article)
        if(saved > -1){
            profile.savedArticles.splice(saved,1)
            profile.save()
            return res.status(200).json({"success":"Unsaved article"})
            
        }else{
            profile.savedArticles.push(article)
            profile.save()
            return res.status(200).json({"success":"saved article"})
        }
    }catch(err){
        res.status(500).json(err.message)
    }
   
}

const savedArticles = async(req,res)=>{
    
    try{
       const profile = await UserProfile.findOne({user:req.user.user_id}).exec()
       if(profile) return res.status(200).json(profile.savedArticles)
       res.status(400).json({"error":"No user found"})
    }catch(err){
       res.status(500).json(err.message)
    }
}

const savedArticlesData = async(req,res)=>{
    try{
        if(req.user){
    
     await UserProfile.findOne({user:req.user.user_id}).populate({
        path:'savedArticles',
        model:"Blog"
      })
      .exec(function(err,data){
        if(err) return res.status(400).json({"error":"Something went Wrong"})
        return res.status(200).json(data.savedArticles)
      })
    }else{
        return res.status(409).json({"error":"User not authenticated"})
     }
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports = {saveArticle,savedArticles,savedArticlesData}