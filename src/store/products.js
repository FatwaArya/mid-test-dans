import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "./constants";

//get products
export const getProducts = createAsyncThunk("products", async () => {
  const response = await axios.get(`${BASE_API}products`);
  return response.data;
});

//get product by id
export const getProductById = createAsyncThunk(
  "products",
  async (productId) => {
    const response = await axios.get(`${BASE_API}products/${productId}`);
    return response.data;
  }
);

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
        state.loading = "success";
        state.entities = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});
export const productSelectors = (state) => state.products.entities;

export default productsSlice.reducer;
