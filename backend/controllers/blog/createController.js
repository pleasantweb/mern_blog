const Blog = require('../../models/Blog')

const createBlog =async(req,res)=>{
    const {user,title,category,blogImage,content,status} = req.body
    try{
        const newBlog =await Blog.create({
            author:user,
            title:title,
            blogImage:blogImage,
            category:category,
            content:content,
            status:status,
           
        })
         res.status(201).json({'blog':newBlog})
    }catch(err){
       res.status(500).json(err)
    }  
}
module.exports = {createBlog}