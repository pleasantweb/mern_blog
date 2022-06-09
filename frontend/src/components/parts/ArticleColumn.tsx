import { blogData } from "../../types";

type propType={
  v: blogData & {
    _id: string;
}
}
const ArticleColumn = (props:propType) => {
  const {v} = props
  return (
    <div className="col">
              <div className="card shadow-sm">
                {/* <svg
                  className="bd-placeholder-img card-img-top"
                  width="100%"
                  height="225"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: صورة مصغرة"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                > */}
                  <img src={v.blogImage} alt={v.title}  className="bd-placeholder-img card-img-top" />
                  {/* <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    Image
                  </text>
                </svg> */}

                <div className="card-body">
                  <p className="card-text">{v.title}</p>
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
  )
}

export default ArticleColumn