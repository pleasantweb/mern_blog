const Blog = require('../../models/Blog')

const deleteBlog = async(req,res)=>{
   const blogId = req.params.blogId
   try{
      await Blog.deleteOne({id:blogId})
      res.status(200).json({"Success":"Blog deleted successfully"})

   }catch(err){
     res.status(500).json(err.message)
   }
}

module.exports = {deleteBlog}