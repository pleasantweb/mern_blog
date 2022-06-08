const Blog = require('../../models/Blog')

const updateBlog =async(req,res)=>{
    const blogId = req.params.blogId
    const {title,blogImage,category,content,status} = req.body
    try{
        const blog = await Blog.findById(blogId)
        if(!blog) return res.status(400).json({"Error":"No Blog found by this id"})
        blog.title = title
        blog.blogImage = blogImage
        blog.category = category
        blog.content = content
        blog.status = status
       
        await blog.save()
        res.status(201).json({"data":blog})
        
    }catch(err){
       res.status(500).json(err)
    }  
}
module.exports = {updateBlog}