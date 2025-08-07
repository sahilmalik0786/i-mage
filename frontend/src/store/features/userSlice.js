import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import { login } from "../../services/api/loginApi";
import { verifyUser } from "../../services/api/verifyUser";
import { signup } from "../../services/api/signupApi";
import { emailVerify } from "../../services/api/emailverifyApi";
import { handleLogout } from "../../services/api/logoutApi";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    status:null,
    mailinitialized:false
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        (state.isAuthenticated = true), (state.loading = false);
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(signupUser.pending, (state)=>{
        state.loading = true
      })
      .addCase(signupUser.fulfilled , (state,action)=>{
        state.status = action.payload.message
        state.user = action.payload.user
        state.isAuthenticated = true
        state.loading = false
      })
      .addCase(signupUser.rejected , (state , action)=>{
        state.error = action.payload || action.error.message; 
        state.loading = false
      })
      .addCase(verfifyEmail.pending , (state)=>{
        state.loading = true
      })
      .addCase(verfifyEmail.fulfilled ,(state , action)=>{
        state.status = action.payload.message
        state.loading = false
        state.mailinitialized = true
      })
      .addCase(verfifyEmail.rejected , (state , action)=>{
        state.status = action.payload || action.error.message
        state.loading = false
      })
      .addCase(logout.pending ,(state)=>{
        state.loading = true
      })
      .addCase(logout.fulfilled ,(state,action)=>{
        state.status = action.payload.message
        state.isAuthenticated = false
        state.user = null
        state.loading = false
      })
      .addCase(logout.rejected ,(state , action)=>{
        state.loading = false
        state.status = action.payload.message || action.error.message
      })
  },
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      if (!response.ok) {
        return rejectWithValue(await response?.statusText || "Login failed");
      }
      return response.json();
    } catch (error) {
      

      return rejectWithValue(error);
    }
  }
);

export const verifyAuth = createAsyncThunk("verfify/user", async (_ , {rejectWithValue})=>{
  try {
    const res = await verifyUser()
    if(!res.ok){
      return rejectWithValue(res?.statusText || "session expired")
    }
    return res.json()
  } catch (error) {
    return rejectWithValue(error)
  }
});

export const signupUser = createAsyncThunk('signup/user' , async (credentials , {rejectWithValue})=>{
  try{
    const res = await signup(credentials)
   
    const data =   await res.json()
    
    
    if(!res.ok){
     return rejectWithValue(data?.message)
    }
    return data
  } catch(error){
     return rejectWithValue(error.message)
  }
} )

export const verfifyEmail = createAsyncThunk('verify/Email' , async (credentials, {rejectWithValue})=>{
    try{
      const res = await emailVerify(credentials)
      console.log(res)
      const data = await res.json()
      console.log(data)
      if(!res.ok){
        return rejectWithValue(data?.message)
      }
      return data
    }
    catch(error){
      return rejectWithValue(error.message)
    }
})

export const logout = createAsyncThunk('logout/user' , async (_,{rejectWithValue})=>{
    try {
        const res = await handleLogout()
        const data = res.json()
        if(!res.ok){
          return rejectWithValue(data?.message)
        }
          return data
    } catch (error) {
      rejectWithValue(error)
    }
})
export default userSlice.reducer;
