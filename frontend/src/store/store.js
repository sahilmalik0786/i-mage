import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './features/menuSlice'
import  themeReducer  from './features/themeSlice'
import  userSlice  from './features/userSlice'
import  postSlice  from './features/postSlice'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    theme: themeReducer,
    user: userSlice,
    post: postSlice,
  },
})