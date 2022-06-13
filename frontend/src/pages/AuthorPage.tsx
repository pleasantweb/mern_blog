import { useParams } from "react-router-dom"
import ArticleColumn from "../components/parts/ArticleColumn"
import { useCurrentAuthorBlogQuery } from "../reduxTool/features/blog/blogApi"


const AuthorPage = () => {
  const {authorid} = useParams()
  const {data} = useCurrentAuthorBlogQuery(authorid? authorid: '')
console.log(data);


  return (
    <div className='container'>
        <div className="col-lg-6 col-md-8 my-4 text-capitalize">
            <h1 className="fw-light">Vishal Kumar</h1>
        </div>

        <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {Array.isArray(data) && data.length ?(
              data.map((v,i)=>(
               <ArticleColumn key={i} v={v} isMutated={false} />
              ))
              
            ):('')}
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default AuthorPage