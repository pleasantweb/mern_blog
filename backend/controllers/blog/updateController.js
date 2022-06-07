const Blog = require('../../models/Blog')

const updateBlog =async(req,res)=>{
    const blogId = req.params.blogId
    const {user,title,blogImage,content,status,reaction} = req.body
    try{
        const blog = await Blog.findById(blogId)
        if(!blog) return res.status(400).json({"Error":"No Blog found by this id"})
        blog.title = title
        blog.blogImage = blogImage
        blog.content = content
        blog.status = status
        blog.reaction = reaction
        await blog.save()
        res.status(201).json({"data":blog})
        
    }catch(err){
       res.status(500).json(err)
    }  
}
module.exports = {updateBlog}