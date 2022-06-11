import { createAsyncThunk } from "@reduxjs/toolkit"
import { isLiked } from "./blogServices"

export const isLikedAsync = createAsyncThunk('blog/isLiked',
  async()=>{
      const res = await isLiked()
      return res
  }
)