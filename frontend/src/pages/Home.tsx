import HomeColumn from "../components/parts/HomeColumn"
import { useAppSelector } from "../reduxTool/app/hooks"
import { useAllBlogQuery } from "../reduxTool/features/blog/blogApi"


const Home = () => {
  // const allBlogs = useAppSelector(state=>state.blog.allBlogs)
  const currentCategory = useAppSelector(state=>state.blog.category)
  const {isSuccess,isError,data} = useAllBlogQuery('')
  return (
    <main className="container">
  <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
    <div className="col-md-6 px-0">
      <h1 className="display-4 fst-italic">Title of a longer featured blog post</h1>
      <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
      <p className="lead mb-0"><a href="#" className="text-white fw-bold">Continue reading...</a></p>
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
  )
}

export default Home