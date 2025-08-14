import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   fetchCategories,
//   fetchSubcategories,
//   fetchProducts,
// } from "../../services/api";

import {
  fetchCategories as apiFetchCategories,
  fetchSubcategories as apiFetchSubcategories,
  fetchProducts as apiFetchProducts, // Renamed to avoid
  bulkUpdateStock as apiBulkUpdateStock, // Add this import
} from "../../services/api";

// Add this async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "inventory/fetchProducts",
  async () => {
    const products = await apiFetchProducts();
    return products;
  }
);

export const bulkUpdateStock = createAsyncThunk(
  "inventory/bulkUpdateStock",
  async (updates, { rejectWithValue }) => {
    try {
      const response = await apiBulkUpdateStock(updates);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadInventory = createAsyncThunk("inventory/load", async () => {
  const [categories, subcategories, products] = await Promise.all([
    apiFetchCategories(),
    apiFetchSubcategories(),
    apiFetchProducts(),
  ]);
  return { categories, subcategories, products };
});

// export const loadInventory = createAsyncThunk("inventory/load", async () => {
//   const [categories, subcategories, products] = await Promise.all([
//     fetchCategories(),
//     fetchSubcategories(),
//     fetchProducts(),
//   ]);
//   return { categories, subcategories, products };
// });

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    categories: [],
    subcategories: [],
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // CATEGORY ACTIONS
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
    },

    // SUBCATEGORY ACTIONS
    addSubcategory: (state, action) => {
      state.subcategories.push(action.payload);
    },
    updateSubcategory: (state, action) => {
      const index = state.subcategories.findIndex(
        (s) => s.id === action.payload.id
      );
      if (index !== -1) {
        state.subcategories[index] = action.payload;
      }
    },
    deleteSubcategory: (state, action) => {
      state.subcategories = state.subcategories.filter(
        (s) => s.id !== action.payload
      );
    },

    // PRODUCT ACTIONS (CORRECTED - SINGLE DEFINITION)
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      // ONLY ONE DEFINITION
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories;
        state.subcategories = action.payload.subcategories;
        state.products = action.payload.products;
      })
      .addCase(bulkUpdateStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bulkUpdateStock.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update local state with new stock values
        action.payload.forEach((update) => {
          const product = state.products.find((p) => p.id === update.productId);
          if (product) {
            product.stock += update.quantity;
          }
        });
      })
      .addCase(bulkUpdateStock.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || action.error.message;
      })
      .addCase(loadInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loadInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories;
        state.subcategories = action.payload.subcategories;
        state.products = action.payload.products;
      })
      .addCase(loadInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add cases for fetchProducts
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

export const {
  addCategory,
  updateCategory,
  deleteCategory,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
  addProduct,
  updateProduct, // SINGLE EXPORT
  deleteProduct,
} = inventorySlice.actions;

export default inventorySlice.reducer;
