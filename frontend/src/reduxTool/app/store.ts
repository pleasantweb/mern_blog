import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import blogReducer from '../features/blog/blogSlice'
import { baseApi } from '../query/baseApi';

export const store = configureStore({
  reducer: {
    
    auth:authReducer,
    blog:blogReducer,
    [baseApi.reducerPath]:baseApi.reducer
    
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
    
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
