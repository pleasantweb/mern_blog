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
} from "../reduxTool/features/blog/blogApi";
import {  fullBlogData } from "../types";
import { BsBookmarkPlus, BsBookmarkStarFill } from "react-icons/bs";

const Article = () => {
  const navigate = useNavigate();

  const [articleLiked, setArticleLiked] = useState(false);
  const [articleSaved, setArticleSaved] = useState(false);

  const [article, setArticle] = useState<fullBlogData>();
  const { articleId } = useParams();
  const { data } = useAllBlogQuery("");
  const user = useAppSelector((state) => state.auth.user_id);
  console.log(user);

  const LikedArticles = useAppSelector((state) => state.auth.likedArticles);
  const SavedArticles = useAppSelector(state=>state.auth.savedArticles)

  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
    if (Array.isArray(data) && data.length) {
      const blog = data.filter((v) => v._id === articleId);
      setArticle(blog[0]);
    }
  }, [data]);

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
                  title="Unsave Article"
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
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              temporibus explicabo saepe possimus? Laboriosam facere quidem
              numquam. Blanditiis rem error delectus magni reiciendis sit non
              quae aut doloribus! Consectetur ab nihil facere dolorem
              voluptatibus itaque iure dolore alias sequi assumenda, illum
              commodi cupiditate a asperiores tempora numquam quod non sunt
              exercitationem libero laborum tempore. Ducimus ipsum aliquid
              veritatis laborum consequuntur culpa aperiam amet autem obcaecati
              fuga officiis fugiat animi qui cupiditate eligendi reprehenderit
              delectus, itaque consequatur atque voluptatibus rem id laudantium
              dignissimos sit! Iste, explicabo aliquam numquam dolorum harum
              incidunt laudantium dolores voluptatem, soluta atque cum enim.
              Corrupti quis illum voluptate fuga animi! Quasi, ipsum. Itaque,
              doloribus! Sequi sint cum placeat doloribus ducimus praesentium
              dolor eveniet repellat, non amet eligendi voluptas adipisci ex
              consectetur corporis est sit facilis iste! Adipisci dicta sunt,
              perspiciatis similique laboriosam enim autem. Dolorem tempora fuga
              ut dignissimos nemo nesciunt porro pariatur, dolor incidunt quas
              reiciendis quam sunt illum! Consequuntur commodi ea inventore
              dignissimos laudantium dolorum assumenda dolorem sint ratione iste
              beatae nam accusamus eum voluptatibus fuga expedita distinctio
              cumque suscipit animi odit similique blanditiis earum, voluptatem
              debitis. Excepturi corporis ipsa maxime? Expedita iure iste
              deleniti fugiat harum atque temporibus, tempore error perspiciatis
              non. Accusantium, eum nam. Corrupti voluptate aspernatur ex
              nostrum doloribus iste culpa nisi, blanditiis vitae enim earum et
              laboriosam, modi quas omnis fuga quis quaerat quidem deserunt iure
              dolores temporibus quae. Aut sint iure, unde quam porro iusto
              mollitia maxime ab? Est, dignissimos recusandae vitae porro quis
              asperiores ullam nulla assumenda eum suscipit voluptate. Maxime
              consectetur illum nulla, laboriosam minus magnam perferendis ad
              expedita cum accusantium quasi soluta cupiditate explicabo nam
              inventore unde temporibus totam. Non, quis, iure, vitae quo
              aspernatur iusto nemo veritatis quibusdam exercitationem
              necessitatibus error veniam. Sequi dolor architecto, temporibus
              qui totam atque beatae facilis autem eaque quos fugit minima in
              voluptates dolore nemo enim eum vitae omnis saepe! Inventore nulla
              sint illo totam, laborum beatae ducimus quod porro in quasi
              accusamus nostrum quos! Reiciendis ipsam, suscipit sed vel error
              dignissimos inventore itaque, aut cupiditate fugiat architecto
              explicabo! Fugit corrupti, quidem, similique ipsum quia maxime
              aliquam, autem voluptate neque repellat consequatur. Quisquam,
              accusantium? Quasi esse numquam est quam praesentium veniam
              sapiente maxime! Voluptatem voluptate repellendus distinctio nisi
              quae ex! Veritatis molestiae accusamus error. Quidem nesciunt
              aliquam ipsam nulla reprehenderit voluptas delectus cumque
              deserunt officia, alias, eveniet illum ut quod sit asperiores
              cupiditate nihil, mollitia commodi magnam. Tempora veniam
              obcaecati quisquam facere perferendis tempore veritatis quaerat
              animi delectus magnam, ducimus deserunt? Voluptates, sequi et
              quasi dolor, necessitatibus officia, nulla voluptate hic eligendi
              exercitationem modi blanditiis perspiciatis tempore? Magni, quia
              maxime unde hic esse minus corporis nemo ratione adipisci nisi
              fugiat, earum illo dignissimos reiciendis culpa voluptatum dolore
              vitae minima ipsa assumenda sit ab perspiciatis neque? Porro
              beatae, laboriosam aspernatur qui, saepe a ratione dolor amet hic
              explicabo dicta culpa sit iusto ex autem magni aliquid, voluptate
              eum eos. Possimus voluptatum sequi ad labore. Cum, voluptate
              placeat, neque nulla ipsam aut voluptatibus molestiae laborum
              accusamus aspernatur, deserunt est. Vero id similique sit?
            </p>
          </div>
          <div style={{ fontSize: "1.3rem" }} className="d-flex mt-5 px-5">
            <div>
              {article.likes}
              {articleLiked ? (
                <AiFillHeart
                  title="Unlike Article"
                  style={{ cursor: "pointer" }}
                  className="mx-2 text-danger"
                  onClick={() => onLike(false, article._id)}
                />
              ) : (
                <AiOutlineHeart
                  title="Like Article"
                  style={{ cursor: "pointer" }}
                  className="mx-2"
                  onClick={() => onLike(true, article._id)}
                />
              )}
            </div>
            <div className="mx-3">
              5 <AiOutlineComment />
            </div>
          </div>
        </>
      ) : (
        <h1 className="mt-5 text-center">No Article Found</h1>
      )}
    </div>
  );
};

export default Article;
