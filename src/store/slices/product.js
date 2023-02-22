import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = [];

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data.products;
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id) => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [fetchProduct.fulfilled]: (state, action) => {
      return [action.payload];
    },
  },
});

export default productsSlice.reducer;
