import { commentBodySend, deleteComment, fullBlogData, likeUnlikeBody } from "../../types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        likeUnlike :build.mutation<any,likeUnlikeBody>({
            query:(body)=>({
                url:'/blog/like_article',
                method:"POST",
                credentials:"include",
                body:body
            }),
            invalidatesTags:['likedBlogs']
        }),

        saveUnsave:build.mutation<any,likeUnlikeBody>({
            query:(body)=>({
                url:'/blog/save_article',
                method:"POST",
                credentials:"include",
                body:body
            }),
            invalidatesTags:['savedBlogs']
        }),

        createComment:build.mutation<any,commentBodySend>({
            query:(body)=>({
                method:"POST",
                url:"/blog/comment",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: body,
                credentials: "include",
            }),
            invalidatesTags:['comments']
        }),

        deleteComment:build.mutation<any,deleteComment>({
            query:(body)=>({
                url:'/blog/comment/delete',
                method:"DELETE",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: body,
                credentials: "include",
            }),
            invalidatesTags:['comments']
        }),

        likedArticles:build.query<fullBlogData[],string>({
            query:()=>({
                url:'/auth/liked_articles_data',
                method:"GET",
                credentials:'include'
            }),
            providesTags:['likedBlogs']
        }),

        savedArticles:build.query<fullBlogData[],string>({
            query:()=>({
                url:'/auth/saved_articles_data',
                method:"GET",
                credentials:"include"
            }),
            providesTags:['savedBlogs']
        })

    })
})

export const {
    useLikeUnlikeMutation,
    useSaveUnsaveMutation,
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useLikedArticlesQuery,
    useSavedArticlesQuery
} = userApi