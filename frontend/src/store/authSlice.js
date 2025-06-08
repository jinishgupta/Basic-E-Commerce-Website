import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "../hooks/use-toast";

const initialState = {
  isAuthenticated: false,
  isLoading:true,
  user: null
};

export const registerUser = createAsyncThunk(
  "/auth/signup",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/signup",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true,
        headers :{ 'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate' }
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setUser: (state, action) => {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast({
          title: "Registration successful",
          description: "You can now log in with your credentials.",
          status: "success",
        });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast({
          title: "Registration failed",
          description: action.error.message || "Please try again.",
          status: "error",
        });
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
        if(action.payload.success) {
          toast({
            title: "Login successful",
            description: `Welcome back, ${action.payload.user.email}`,
            status: "success",
          });
        } else {
          toast({
            title: "Login failed",
            description: action.payload.message || "Invalid credentials",
            status: "error",
          });
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast({
          title: "Login failed",
          description: "Please try again.",
          status: "error",
        });
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast({
          title: "Logout successful",
          description: "You have been logged out.",
          status: "success",
        });
      })
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
