const Blog = require('../../models/Blog')

const getAuthorBlogs = async(req,res)=>{
   const userId = req.params.userId
   console.log('userId',userId);
   console.log('hai to req.user',req.user);
   try{
     //    if(userId !== req.user.user_id) return res.status(400).json({"error":"NO User found"})
        const findBlogs = await Blog.find({author:userId})
        if(!findBlogs) return res.status(409).json({"message":"No Data Found"})
        res.status(200).json(findBlogs)
   }catch(err){
        res.status(500).json(err.message)
   }
  
}
module.exports = {getAuthorBlogs}