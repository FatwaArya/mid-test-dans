import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  products: [],
  getProducts: async () => {
    const response = await axios.get("http://localhost:3000/products");
    const data = response.data;
    set({ products: data.products });
  },
}));

export default useProductStore;
