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
    likedArticles:fullBlogData[],
    savedArticles:fullBlogData[]
}
export type payLoadUser = {
 
        data: userData;
        isAuthenticated: boolean;
   
}
export type likedArticlesByUser={
    likedArticles:string[]
}

export type fullBlogData = {
    _id:string,
    author:{
        _id:string,
        first_name:string,
        last_name:string
    },
    title:string,
    blogImage:string,
    category:string,
    content :string,
    status:string,
    datePosted:string,
    likes:number
}

export type blogDataMutation = {
    author:string,
    title:string,
    blogImage:string,
    category:string,
    content :string,
    status:string,
}

export type blogState = Omit<blogDataMutation,'status' | 'author' >


export type allCategories = "all"|"world" |"technology"|"design"|"culture"|"business"|"politics"|"opinion"|"science"|"health"|"style"|"travel"

export type blogInitalState = {
    category:allCategories,
}

export type likeUnlikeBody = {
    article:string,
    user:string
}