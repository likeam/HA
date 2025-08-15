import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategories,
  getSubcategories,
  getProducts,
} from "../services/productService";

export const fetchCategories = createAsyncThunk(
  "inventory/fetchCategories",
  async () => {
    return await getCategories();
  }
);

export const fetchSubcategories = createAsyncThunk(
  "inventory/fetchSubcategories",
  async (categoryId) => {
    return await getSubcategories(categoryId);
  }
);

export const fetchProducts = createAsyncThunk(
  "inventory/fetchProducts",
  async (subcategoryId) => {
    return await getProducts(subcategoryId);
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    categories: [],
    subcategories: [],
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSubcategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default inventorySlice.reducer;
