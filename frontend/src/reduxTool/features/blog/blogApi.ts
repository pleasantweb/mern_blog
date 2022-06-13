import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { blogDataMutation, fullBlogData, likeUnlikeBody } from "../../../types";
const { REACT_APP_BACKEND_URL } = process.env;

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACKEND_URL}/blog` }),
    tagTypes: ['BlogData'],
    endpoints: (builder) => ({
        allBlog: builder.query<(fullBlogData)[], string>({
            query: () => ({
                url: "/",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ['BlogData']
        }),

        currentAuthorBlog: builder.query<(fullBlogData)[], string>({
            query: (userId) => ({
                url: `/author_blogs/${userId}`,
                credentials: "include",
            }),
            providesTags: ['BlogData']
        }),

        blogCreate: builder.mutation<
            fullBlogData,
            blogDataMutation
        >({
            query: (body) => ({
                url: "/",
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: body,
                credentials: "include",
            }),
            invalidatesTags: ['BlogData']
        }),

        blogUpdate:builder.mutation<fullBlogData,blogDataMutation & {_id:string}>({
            query:(body)=>{
               let {_id} = body
               return {
                url:`${_id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: body,
                credentials: "include",
            }},
            invalidatesTags: ['BlogData']
        }),

        blogDelete: builder.mutation({
            query: (blogId) => ({
                url: `${blogId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ['BlogData']
        }),
        
        blogLike:builder.mutation<any,likeUnlikeBody>({
            query:(body)=>({
                url:'/like_article',
                method:"POST",
                credentials:"include",
                body:body
            }),
            invalidatesTags: ['BlogData']
        }),

        blogUnLike:builder.mutation<any,likeUnlikeBody>({
            query:(body)=>({
                url:'/unlike_article',
                method:"POST",
                credentials:"include",
                body:body
            }),
            invalidatesTags: ['BlogData']
        }),

        blogSave:builder.mutation<any,likeUnlikeBody>({
            query:(body)=>({
                url:'/save_article',
                method:"POST",
                credentials:"include",
                body:body
            }),
            invalidatesTags: ['BlogData']
        })
        
    }),
});

export const {
    useAllBlogQuery,
    useBlogCreateMutation,
    useCurrentAuthorBlogQuery,
    useBlogUpdateMutation,
    useBlogDeleteMutation,
    useBlogLikeMutation,
    useBlogUnLikeMutation,
    useBlogSaveMutation
} = blogApi;
