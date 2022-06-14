import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../reduxTool/app/hooks";
import { format } from "date-fns";
import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import {
  useAllBlogQuery,
  useBlogLikeMutation,
  useBlogSaveMutation,
  useBlogUnLikeMutation,
  useGetCommentQuery,
} from "../reduxTool/features/blog/blogApi";
import {  fullBlogData } from "../types";
import { BsBookmarkPlus, BsBookmarkStarFill } from "react-icons/bs";
import Comments from "../components/parts/Comments";

const Article = () => {
  const navigate = useNavigate();

  const [articleLiked, setArticleLiked] = useState(false);
  const [articleSaved, setArticleSaved] = useState(false);

  const [article, setArticle] = useState<fullBlogData>();
  const { articleId } = useParams();
  const { data:blogData } = useAllBlogQuery("");
  const user = useAppSelector((state) => state.auth.user_id);
  console.log(user);

  const LikedArticles = useAppSelector((state) => state.auth.likedArticles);
  const SavedArticles = useAppSelector(state=>state.auth.savedArticles)

  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
    if (Array.isArray(blogData) && blogData.length) {
      const blog = blogData.filter((v) => v._id === articleId);
      setArticle(blog[0]);
    }
  }, [blogData]);

  useEffect(() => {
    if (article && Array.isArray(LikedArticles) && LikedArticles.length) {
      let isLiked = LikedArticles.filter(v=>v._id === article._id);
      if (isLiked.length) {
        setArticleLiked(true);
      }
    }
  }, [article]);

  useEffect(() => {
    if (article && Array.isArray(SavedArticles) && SavedArticles.length) {
      let isSaved = SavedArticles.filter(v=>v._id === article._id)
      if (isSaved.length) {
        setArticleSaved(true);
      }
    }
  }, [article]);



  const [likePost, res] = useBlogLikeMutation();
  const [unLikePost, resp] = useBlogUnLikeMutation();
  const [saveArticle,respo] = useBlogSaveMutation()
 
 
  const onLike = async (like: boolean, article: string) => {
    if (!user) {
      navigate("/auth/login");
    } else {
      setArticleLiked(like);
      const body = { article, user };
      if (like) {
        await likePost(body);
      } else {
        await unLikePost(body);
      }
    }
  };

  const onSaveArticle=async(save:boolean,article:string)=>{
    if (!user) {
      navigate("/auth/login");
    } else {
      setArticleSaved(save)
      const body = {article,user}
      await saveArticle(body)
    }
  }



  const dateReturn = (datePosted: string) => {
    let date = format(new Date(datePosted), "LLLL d, yyyy");

    return date;
  };

  return (
    <div className="container min-vh-100 mt-5">
      {article ? (
        <>
          <h1 className="text-center">{article.title}</h1>

          <div className="px-5 mb-3 d-flex justify-content-between align-items-end ">
            <div
              style={{ borderLeft: "2px solid gray" }}
              className="px-4 d-flex justify-content-end align-items-start flex-column"
            >
              {articleSaved ? (
                <BsBookmarkStarFill
                  title="Saved"
                  className="
                  text-danger"
                  style={{ fontSize: "1.5rem", cursor: "pointer" }}
                  onClick={()=>onSaveArticle(false,article._id)}
                />
              ) : (
                <BsBookmarkPlus
                  title="Save Article"
                  style={{ fontSize: "1.5rem", cursor: "pointer" }}
                  onClick={()=>onSaveArticle(true,article._id)}
                />
              )}

              <p className="p-0 m-0" style={{ fontSize: "1.2rem" }}>
                Article By-{" "}
                <Link to={`/author/${article.author._id}`}>
                <span className="text-capitalize" style={{ cursor: "pointer" }} title="Visit Author">
                 {article.author.first_name + ' ' + article.author.last_name}
                </span>
                </Link>
              </p>
            </div>
            <div className=" d-flex justify-content-end align-items-end flex-column">
              <p className="text-success m-0" style={{ fontSize: "1.1rem" }}>
                {dateReturn(article.datePosted)}
              </p>
              <p
                className="m-0 text-capitalize text-success"
                style={{ fontSize: "1.1rem" }}
              >
                | {article.category} |
              </p>
            </div>
          </div>

          <img
            className="rounded mx-auto d-block"
            style={{ minWidth: "90%" }}
            height="500"
            width="auto"
            src={article.blogImage}
            alt={article.title}
          />
          <div className="px-5">
            <p>{article.content}</p>
          
          </div>
          <div style={{ fontSize: "1.3rem" }} className="d-flex mt-5 px-5">
            <div>
              {article.likes}
              {articleLiked ? (
                <AiFillHeart
                  title="Liked"
                  style={{ cursor: "pointer" }}
                  className="mx-2 text-danger"
                  onClick={() => onLike(false, article._id)}
                />
              ) : (
                <AiOutlineHeart
                  title="Click to Like Article"
                  style={{ cursor: "pointer" }}
                  className="mx-2"
                  onClick={() => onLike(true, article._id)}
                />
              )}
            </div>
            <div className="mx-3">
              {article.comments} <AiOutlineComment />
            </div>
          </div>
          <Comments articleId={article._id} author={article.author} />
        </>
      ) : (
        <h1 className="mt-5 text-center">No Article Found</h1>
      )}
    </div>
  );
};

export default Article;
