import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data.products;
  }
);

const initialState = {
  loading: false,
  products: [],
  error: null,
  success: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: { entities: [], loading: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = "idle";
        state.entities.push(...action.payload);
      });
  },
});

export default productsSlice.reducer;
