const router = require('express').Router()
const { createBlog } = require('../../controllers/blog/createController')
const { deleteBlog } = require('../../controllers/blog/deleteController')
const { getAllBlogs } = require('../../controllers/blog/getAllController')
const { getBlogById } = require('../../controllers/blog/getByIdController')
const { getAuthorBlogs } = require('../../controllers/blog/getController')
const { updateBlog } = require('../../controllers/blog/updateController')
const { createComment, getComments, deleteComment } = require('../../controllers/comments')
const { likeArticle,unlikeArticle} = require('../../controllers/likes/likeArticle')
const { saveArticle } = require('../../controllers/saveArticle/saveArticle')
const { userAuthenticated } = require('../../middlewares/checkAuth')



router.get('/',getAllBlogs)
router.get('/getbyid/:blogId',getBlogById)
router.get('/author_blogs/:userId',getAuthorBlogs)
router.post('/',userAuthenticated,createBlog)
router.put('/:blogId',userAuthenticated,updateBlog)
router.delete('/:blogId',userAuthenticated,deleteBlog)


router.post('/like_article',userAuthenticated,likeArticle)
// router.post('/unlike_article',userAuthenticated,unlikeArticle)

router.post('/save_article',userAuthenticated,saveArticle)

router.post('/comment',createComment)
router.get('/getcomment/:article_id',getComments)
router.delete('/comment/delete',deleteComment)

module.exports = router