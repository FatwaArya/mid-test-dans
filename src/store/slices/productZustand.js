import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  products: [],
  getProducts: async () => {
    const response = await axios.get("http://localhost:3000/products");
    const data = response.data;
    set({ products: data.products });
  },
  getProduct: async (id) => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    const data = response.data;
    set({ products: [data] });
  },
}));

export default useProductStore;
