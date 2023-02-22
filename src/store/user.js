import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "./constants";

// initialize userToken from local storage
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

export const registerUser = createAsyncThunk(
  "users",
  async ({ name, email, password }) => {
    const response = await axios.post(`http://localhost:3000/users`, {
      name,
      email,
      password,
    });
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "users",
  async ({ email, password }) => {
    const response = await axios.post(`http://localhost:3000/users/login`, {
      email,
      password,
    });
    return response.data;
  }
);

export const logoutUser = createAsyncThunk("users", async () => {
  const response = await axios.post(`${BASE_API}users/logout`);
  return response.data;
  setLocalStorage(LOCAL_STORAGE_TOKEN, "");
});

// export const getUsers = createAsyncThunk("users", async () => {
//   const response = await axios.get(`${BASE_API}users/me`, TOKEN);
//   return response.data;
// });

// const initalState = {
//   user: null,
//   token: token,
//   status: "idle",
//   error: null,
// };

const userAdapter = createEntityAdapter({
  selectId: (user) => user._id,
});

// const initialState = userAdapter.getInitialState({
//   user: null,
//   token: token,
//   status: "idle",
//   error: null,
// });

const userSlice = createSlice({
  name: "users",
  initialState: userAdapter.getInitialState(),
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      userAdapter.addOne(state, action.payload);
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      userAdapter.addOne(state, action.payload);
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [logoutUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      userAdapter.removeOne(state, action.payload);
    },
    [logoutUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  userAdapter.getSelectors((state) => state.users);

export default userSlice.reducer;
