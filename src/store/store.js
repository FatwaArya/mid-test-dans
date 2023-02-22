import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import productsSlice from "./products";

export default configureStore({
  reducer: {
    users: userSlice,
    products: productsSlice,
  },
});
