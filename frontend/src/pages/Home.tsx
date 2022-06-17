import Navbar from "../components/Navbar"
import HomeColumn from "../components/parts/HomeColumn"
import { useAppSelector } from "../reduxTool/app/hooks"
// import { useAllBlogQuery } from "../reduxTool/features/blog/blogApi"
import { useAllBlogQuery } from "../reduxTool/query/blogApi"


const Home = () => {
  
  const currentCategory = useAppSelector(state=>state.blog.category)
  const {data} = useAllBlogQuery('')
  return (
    <div className="container">
    <Navbar />
  
    <main className="container">
  <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
    <div className="col-md-6 px-0">
      <h1 className="display-4 fst-italic">Follow Your Favourite Author</h1>
      <p className="lead my-3">Be up to date with every new article from your subscribed Author. You will be notify instantly when an article get posted. </p>
      {/* <p className="lead mb-0"><a href="#" className="text-white fw-bold">Continue reading...</a></p> */}
    </div>
  </div>

  <div className="row mb-2">

   {Array.isArray(data) && data.length ? (
     currentCategory === 'all' ? (
      data.map((v,i)=>(
        <HomeColumn key={i} v={v} />
      ))
     ):(
       data.filter(v=>v.category === currentCategory).map((v,i)=>(
        <HomeColumn key={i} v={v} />
       ))
     )
     
   ):(<h1>No Article Yet...</h1>)}
    

  </div>
  </main>
  </div>
  )
}

export default Home