import { blogDataMutation, fullBlogData } from "../../types";
import { baseApi } from "./baseApi";

const authorApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        authorBlogs:build.query<(fullBlogData)[], string>({
            query:(userId)=>({
                url:`/blog/author_blogs/${userId}`,
                method:"GET",
                credentials:'include'
            }),
            providesTags:['allBlogs']
        }),

        createBlog:build.mutation<fullBlogData,blogDataMutation>({
            query:(body)=>({
                url:'/blog',
                method:"POST",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: body,
            }),
            invalidatesTags:['allBlogs']
        }),

        updateBlog:build.mutation<fullBlogData,blogDataMutation & {_id:string}>({
            query:(body)=>{
               let {_id} = body
               return {
                url:`/blog/${_id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: body,
                credentials: "include",
            }},
            invalidatesTags: ['allBlogs']
        }),

        deleteBlog: build.mutation({
            query: (blogId) => ({
                url: `/blog/${blogId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ['allBlogs']
        }),


    })
})

export const {useAuthorBlogsQuery,useCreateBlogMutation,useUpdateBlogMutation,useDeleteBlogMutation} = authorApi