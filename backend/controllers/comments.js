const Comment = require("../models/Comment")

const createComment = async(req,res)=>{
    const {article,comment,commentBy,commentTo}= req.body
    try{
      const findArticle = await Comment.findOne({article:article}).exec()
      console.log('find',findArticle);
      if(!findArticle){
        const firstComment = await Comment.create({
            article:article,
            comments:[
                {
                    comment:comment,
                    commentBy:commentBy,
                    commentTo:commentTo
                }
            ]
        })
        return res.status(201).json(firstComment)
      }else{
      const addComment = {
                comment:comment,
                commentBy:commentBy,
                commentTo:commentTo
      }
      findArticle.comments.push(addComment)
      await findArticle.save()
      return res.status(201).json(findArticle)
    }
    }catch(err){
      res.status(500).json(err.message)
    }
    

    
}

const getComments = async(req,res)=>{
    try{
        const article_id= req.params.article_id
         await Comment.findOne({article:article_id})
        .populate({
            path:'comments.commentBy',
            model:"User",
            select:"first_name last_name"
        })
        .populate({
            path:'comments.commentTo',
            model:"User",
            select:"first_name last_name"
        })
        .exec(function(err,data){
            if(err) return res.status(400).json(err)
        
            res.status(200).json(data)
        })
       
    }catch(err){
        res.status(500).json(err.message)
    }
    
}

const deleteComment = async(req,res)=>{
    const {articleId,commentId} = req.body
    try{
       
        
        await Comment.updateOne({article:articleId},
            {
                $pull:{comments:{_id:commentId}}
            })
       
        res.status(200).json({"success":"Comment deleted"})
    }catch(err){
        res.status(500).json(err.message)
    }
}


module.exports ={ createComment,getComments,deleteComment}