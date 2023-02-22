import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/users", user);

      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        user
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.userInfo = null;
      state.userToken = null;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      state.success = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      state.success = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
