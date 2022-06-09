import { useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleColumn from "../../components/parts/ArticleColumn";
import { useAppDispatch, useAppSelector } from "../../reduxTool/app/hooks";
import { useCurrentAuthorBlogQuery } from "../../reduxTool/features/blog/blogApi";
import { setAuthorData } from "../../reduxTool/features/blog/blogSlice";

const Profile = () => {

  const dispatch = useAppDispatch()
  const username = useAppSelector((state) => state.auth.username);
  const userId = useAppSelector(state=>state.auth.user_id)
  const authorData = useAppSelector(state=>state.blog.authorBlogs)
  const {isSuccess,isError,data} = useCurrentAuthorBlogQuery(userId)
  console.log(data);

  useEffect(()=>{
     if(isSuccess){
       dispatch(setAuthorData(data))
     }
  },[isSuccess,data])

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto text-capitalize">
            <h1 className="fw-light">{username}</h1>
            <p className="lead text-muted">
              This is Your Dashboard. You can manage all your articles from
              here.
            </p>

            <Link to='/newarticle' className="btn btn-primary my-2">Create New Article</Link>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {Array.isArray(authorData) && authorData.length ?(
              authorData.map((v,i)=>(
               <ArticleColumn key={i} v={v} />
              ))
              
            ):('')}
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
