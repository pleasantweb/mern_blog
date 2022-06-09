const router = require('express').Router()
const { createBlog } = require('../../controllers/blog/createController')
const { deleteBlog } = require('../../controllers/blog/deleteController')
const { getAllBlogs } = require('../../controllers/blog/getAllController')
const { getBlogById } = require('../../controllers/blog/getByIdController')
const { getAuthorBlogs } = require('../../controllers/blog/getController')
const { updateBlog } = require('../../controllers/blog/updateController')
const { userAuthenticated } = require('../../middlewares/checkAuth')



router.get('/',getAllBlogs)
router.get('/:blogId',getBlogById)
router.get('/author_blogs/:userId',getAuthorBlogs)
router.post('/',userAuthenticated,createBlog)
router.put('/:blogId',userAuthenticated,updateBlog)
router.delete('/:blogId',userAuthenticated,deleteBlog)


module.exports = router