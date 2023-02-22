import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
