const Blog = require('../../models/Blog')

const getBlogById = async(req,res)=>{
   const blogId = req.params.blogId
   try{
        const findBlogs = await Blog.findById(blogId)
        if(!findBlogs) return res.status(409).json({"message":"No Data Found"})
        res.status(200).json(findBlogs)
   }catch(err){
        res.status(500).json(err.message)
   }
  
}
module.exports = {getBlogById}