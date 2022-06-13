import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAuthUser, getLikedArticles, getLikedArticlesData, getSavedArticles, getSavedArticlesData, userLogout } from "./authServices"

export const logoutAsync = createAsyncThunk('auth/logout',
  async()=>{
      const res = await userLogout()
      return res
  }
)

export const authUserAsync = createAsyncThunk('auth/user',
    async () => {
        const res = await getAuthUser()
        return res
    }
)
export const likedArticlesAsync = createAsyncThunk('auth/likedArticles',
    async () => {
        const res = await getLikedArticles()
        return res
    }
)
export const savedArticlesAsync = createAsyncThunk('auth/savedArticles',
    async () => {
        const res = await getSavedArticles()
        return res
    }
)
export const likedArticlesDataAsync = createAsyncThunk('auth/likedArticlesData',
    async () => {
        const res = await getLikedArticlesData()
        return res
    }
)
export const savedArticlesDataAsync = createAsyncThunk('auth/savedArticlesData',
    async () => {
        const res = await getSavedArticlesData()
        return res
    }
)