import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleColumn from "../../components/parts/ArticleColumn";
import {  useAppSelector } from "../../reduxTool/app/hooks";
import { useCurrentAuthorBlogQuery } from "../../reduxTool/features/blog/blogApi";
import { fullBlogData } from "../../types";

type currentShow = "Your" | "Liked" | "Saved"
const showArr:currentShow[] = ['Your','Liked','Saved']

const Profile = () => {

  const [currentShow,setCurrentShow] = useState<currentShow>('Your')

  const [dataBox,setDataBox] = useState<fullBlogData[]>([])
  
  const username = useAppSelector((state) => state.auth.username);
  const userId = useAppSelector(state=>state.auth.user_id)
 
  const {data} = useCurrentAuthorBlogQuery(userId)
  const LikedArticles = useAppSelector(state=>state.auth.likedArticles)
  const SavedArticles = useAppSelector(state=>state.auth.savedArticles)

  useEffect(()=>{
    if(currentShow === 'Your'){
       if(data){
        setDataBox(data)
       }
    }else if(currentShow === 'Liked'){
      setDataBox(LikedArticles)
    }else{
      setDataBox(SavedArticles)
    }
  },[currentShow,data,LikedArticles,SavedArticles])

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-2">
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
      <ul className="mx-3 nav nav-tabs">
        {showArr.map((v,i)=>(
          <li className="nav-item">
           <button onClick={()=>setCurrentShow(v)} className={v === currentShow ? "nav-link active":"nav-link" }>{v} Articles</button>
         </li>
        ))}  
    </ul>
    
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {Array.isArray(dataBox) && dataBox.length ?(
              dataBox.map((v,i)=>(
               <ArticleColumn key={i} v={v} isMutated={currentShow === 'Your' ? true:false} />
              ))
              
            ):('')}
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
