import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ArticleForm from '../../components/articleEdit/ArticleForm';
import { useAppSelector } from '../../reduxTool/app/hooks';
import { useCurrentAuthorBlogQuery } from '../../reduxTool/features/blog/blogApi';
import { blogState } from '../../types';

const UpdateArticle = () => {
    const {articleid} = useParams()
    const [blog,setBlog] = useState<blogState>({
        title:'',
        blogImage:'',
        category:'',
        content :'',
    })
    const userId = useAppSelector(state=>state.auth.user_id)
    const {isSuccess,data} = useCurrentAuthorBlogQuery(userId)
    useEffect(()=>{
        if(isSuccess && articleid){
          const blog = data?.filter(v=>v._id === articleid)
          setBlog({
            title:blog[0].title,
            blogImage:blog[0].blogImage,
            category:blog[0].category,
            content :blog[0].content,
          })
        }
        
    },[isSuccess,articleid,data])
  return (
    <div className='container' style={{minHeight:'100vh'}}>
        <h1 className='text-center'>New Article</h1>
       <ArticleForm 
            blog={blog}
            setBlog={setBlog}
            operation={'update'} 
            _id={articleid ? articleid :''} />
    </div>
  )
}

export default UpdateArticle;