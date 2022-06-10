import { useState } from 'react';
import ArticleForm from '../../components/articleEdit/ArticleForm';
import { blogState } from '../../types';


const NewArticle = () => {
    const [blog,setBlog] = useState<blogState>({
        title:'',
        blogImage:'',
        category:'',
        content :'',
    })

  return (
    <div className='container' style={{minHeight:'100vh'}}>
        <h1 className='text-center'>New Article</h1>
       <ArticleForm 
           blog={blog} 
           setBlog={setBlog} 
           operation={'create'}
           _id={''} />
    </div>
  )
}

export default NewArticle;