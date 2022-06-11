export type authUser ={
    first_name:string,
    last_name:string,
    email:string,
    password:string
}
export type userData = {
    email: string
    roles: Object
    user_id: string
    username: string
}
export type authState={
    user_id:string,
    username:string,
    email:string,
    roles:{},
    isAuthenticated:boolean,
    likedArticles:string[]
}
export type payLoadUser = {
 
        data: userData;
        isAuthenticated: boolean;
   
}
export type likedArticlesByUser={
    likedArticles:string[]
}

export type blogData = {
       author:string,
    title:string,
    blogImage:string,
    category:string,
    content :string,
    status:string,
    datePosted:string
}
export type fullBlogData = blogData & {_id:string,likes:number}
export type blogState = Omit<blogData,'status' | 'author' | 'datePosted'>


export type allCategories = "all"|"world" |"technology"|"design"|"culture"|"business"|"politics"|"opinion"|"science"|"health"|"style"|"travel"

export type blogInitalState = {
    category:allCategories,
}

export type likeUnlikeBody = {
    article:string,
    user:string
}