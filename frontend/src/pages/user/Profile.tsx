import { Link } from "react-router-dom";
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
            <div className="col">
              <div className="card shadow-sm">
                <svg
                  className="bd-placeholder-img card-img-top"
                  width="100%"
                  height="225"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: صورة مصغرة"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    Image
                  </text>
                </svg>

                <div className="card-body">
                  <p className="card-text">This is Title</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Delete
                      </button>
                    </div>
                    <small className="text-muted">Dec 13 2021</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
