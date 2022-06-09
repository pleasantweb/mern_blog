import { useAppDispatch } from "../reduxTool/app/hooks";
import { setHomeCategory } from "../reduxTool/features/blog/blogSlice";
import { allCategories, blogInitalState} from "../types";


const Navbar = () => {

  const Category :allCategories[]= [
    "all",
    "world",
    "technology",
    "design",
    "culture",
    "business",
    "politics",
    "opinion",
    "science",
    "health",
    "style",
    "travel",
  ];
  const dispatch= useAppDispatch()
  const CategorySelect=(category:allCategories)=>{
      dispatch(setHomeCategory(category))
      window.scrollTo({
        top:250,
        behavior:'smooth'
      })
  }
  return (
    <div className="nav-scroller py-1 mb-2">
    <nav className="nav d-flex justify-content-between">
      {Category.map((v,i)=>(
        <p onClick={()=>CategorySelect(v)} className="p-2 link-secondary text-capitalize" style={{cursor:'pointer',userSelect:'none'}}  key={i}>{v}</p>
      ))}
      
    </nav>
  </div>
  )
}

export default Navbar