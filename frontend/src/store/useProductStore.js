import { create } from "zustand";

import axios from "axios";

const BASE_URL = "http://localhost:5000";
export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  // form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct:async(e)=>{
    e.preventDefault();

set({loading:true})
try {
    const {formData}=get();
    await axios.post(`${BASE_URL}/api/products`,formData)
    await get().fetchProducts()
    get().resetForm()
    toast.success("Product added successfully")
    // document.getElementById().close()
} catch (error) {
    console.log("error in addProduct function",error)
    toast.error("something went wrong")
    
}
finally{
    set({loading:false})
}
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (error) {
      if (error.status == 429) set({ error: "Rate limit Exceeded" });
      else set({ error: "something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("product deleted successfully");
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      toast.error("something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
