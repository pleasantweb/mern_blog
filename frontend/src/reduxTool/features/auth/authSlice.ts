import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { payLoadUser, userData } from "../../../types";
import { userLogout } from "./authApi";

export const logoutAsync = createAsyncThunk('auth/logout',
  async()=>{
      const res = await userLogout()
      return res
  }
)

const initialState = {
    user_id:'',
    username:'',
    email:'',
    roles:{},
    isAuthenticated:false
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCurrentUser:(state,action:PayloadAction<payLoadUser>)=>{
          console.log(action);
          const {data,isAuthenticated} = action.payload
          state.isAuthenticated = isAuthenticated
          state.user_id = data.user_id
          state.email = data.email
          state.username = data.username
          state.roles = data.roles
          
        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(logoutAsync.fulfilled,(state,action)=>{
            if(action.payload){
            state.isAuthenticated = false
            state.user_id = ''
            state.email = ''
            state.username = ''
            state.roles = ''
            }
        })
    }
    
})
export const {setCurrentUser} = authSlice.actions
export default authSlice.reducer