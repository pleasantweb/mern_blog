const Blog = require('../../models/Blog')

const deleteBlog = async(req,res)=>{
   const blogId = req.params.blogId

   console.log(blogId);
   try{
      await Blog.deleteOne({_id:blogId})
      res.status(200).json({"Success":"Blog deleted successfully"})

   }catch(err){
     res.status(500).json(err.message)
   }
}

module.exports = {deleteBlog}