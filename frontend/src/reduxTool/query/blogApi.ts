import { commentData, fullBlogData } from "../../types";
import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        allBlog:build.query<(fullBlogData)[], string>({
            query:()=>({
                url:'/blog',
                method:"GET",
                credentials:"include"
            }),
            providesTags:['allBlogs']
        }),

        getComments:build.query<commentData,string>({
            query:(article_id)=>({
                url:`/blog/getcomment/${article_id}`,
                credentials:'include'
            }),
            providesTags:['comments']
        }),
    })
})

export const {useAllBlogQuery,useGetCommentsQuery} = blogApi