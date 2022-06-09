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
export type payLoadUser = {
 
        data: userData;
        isAuthenticated: boolean;
   
}

export type blogData = {
    author:String,
    title:string,
    blogImage:string,
    category:string,
    content :string,
    status:string,
    datePosted:string
}
export type blogState = Omit<blogData,'status' | 'author' | 'datePosted'>

export type blogInitalState = {
    allBlogs:(blogData & {_id:string})[],
    category:allCategories,
    authorBlogs:(blogData & {_id:string})[]
}
export type allCategories = "all"|"world" |"technology"|"design"|"culture"|"business"|"politics"|"opinion"|"science"|"health"|"style"|"travel"

