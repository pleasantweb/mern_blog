import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAuthUser, getLikedArticles, userLogout } from "./authServices"

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