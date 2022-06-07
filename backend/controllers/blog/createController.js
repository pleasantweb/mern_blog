const Blog = require('../../models/Blog')

const createBlog =async(req,res)=>{
    const {user,title,blogImage,content,status,reaction} = req.body
    try{
        const newBlog =await Blog.create({
            user:user,
            title:title,
            blogImage:blogImage,
            content:content,
            status:status,
            reaction:reaction
        })
         res.status(201).json({'blog':newBlog})
    }catch(err){
       res.status(500).json(err)
    }  
}
module.exports = {createBlog}