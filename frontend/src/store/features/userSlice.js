import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import { login } from "../../services/api/loginApi";
import { verifyUser } from "../../services/api/verifyUser";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducer: {
    startLogout: (state) => {
      state.loading = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        (state.isAuthenticated = true), (state.loading = false);
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      if (!response.ok) {
        return rejectWithValue(response?.statusText || "Login failed");
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
export const { startLogout, logout } = userSlice.actions;
export default userSlice.reducer;
