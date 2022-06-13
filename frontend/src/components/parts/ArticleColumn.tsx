import { Link, useNavigate } from "react-router-dom";
import { useBlogDeleteMutation } from "../../reduxTool/features/blog/blogApi";
import {  fullBlogData } from "../../types";

type propType={
  v: fullBlogData,
  isMutated:boolean
}
const ArticleColumn = (props:propType) => {
  const {v,isMutated} = props

  const navigate = useNavigate()
  const [deleteBlog,resp] = useBlogDeleteMutation()


  const onDeleteArticle=async(blogId:string)=>{
     let check = window.confirm('Are You Sure ? This article will be deleted permanently !!!')
     if(check){
       await deleteBlog(blogId)
     }
  }

  return (
    <div className="col">
              <div className="card shadow-sm">
                
                  <img src={v.blogImage} alt={v.title}  className="bd-placeholder-img card-img-top" />
                

                <div className="card-body">
               
                  <p className="card-text">{v.title}</p>
                  <Link className="mb-3" to={`/${v._id}`} >Continue reading...</Link>
                  <div className="d-flex justify-content-between align-items-center">
                   {isMutated ? (
                    <div className="btn-group mt-4">

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={()=>navigate(`/updatearticle/${v._id}`)}
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={ ()=>onDeleteArticle(v._id)}
                    >
                      Delete
                    </button>

                    </div>
                   ):('')} 
                    
                    <small className="text-muted mt-4">Dec 13 2021</small>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default ArticleColumn