import {  fullBlogData } from "../../types";
import { AiOutlineHeart,AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { returnDate } from "../../helper/dateFormat";

type propType={
    v:fullBlogData
}

const HomeColumn = (props:propType) => {
  const {v} = props

 

  
  
  return (
    <div className="col-md-6">
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column justify-content-between position-static">
      <div>
        <strong className="d-inline-block mb-2 text-primary text-capitalize">{v.category}</strong>
        <h3 style={{maxHeight:'100px',overflow:'hidden'}} className="mb-0">{v.title}</h3>
    </div>
        <div>
        <div className="mb-1 text-muted">{returnDate(v.datePosted)}</div>
        <div className="d-flex mt-1">
            <div>{v.likes} <AiOutlineHeart /></div>
            <div className="mx-3">{v.comments} <AiOutlineComment /></div>
          </div>
        {/* <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p> */}
        <Link to={`/${v._id}`} className="stretched-link">Continue reading</Link>
        </div>
      </div>
      <div className="col-auto d-none d-lg-block bg-light">
        {/* <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
         <img src={v.blogImage} alt={v.title} className="bd-placeholder-img" width="220" height="150" style={{marginTop:'50px',borderRadius:'5px 0 0 5px'}} />
      </div>
    </div>
  </div>
  )
}

export default HomeColumn;