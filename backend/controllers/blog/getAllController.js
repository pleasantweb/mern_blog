const Blog = require('../../models/Blog')

const getAllBlogs = async(req,res)=>{
   try{
        const findBlogs = await Blog.find()
        if(!findBlogs) return res.status(409).json({"message":"No Data Found"})
        res.status(200).json(findBlogs)
   }catch(err){
        res.status(500).json(err.message)
   }
  
}
module.exports = {getAllBlogs}