import { Link } from "react-router-dom";
import ArticleColumn from "../../components/parts/ArticleColumn";
import { useAppSelector } from "../../reduxTool/app/hooks";

const Profile = () => {
  const username = useAppSelector((state) => state.auth.username);
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
            <ArticleColumn />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
