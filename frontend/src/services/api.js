import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// src/services/api.js
// ... other API functions ...

export const bulkUpdateStock = (updates) =>
  API.patch("/inventory/products/stock/bulk", { updates });

// Inventory Endpoints
export const fetchCategories = () => API.get("/categories");
export const fetchSubcategories = () => API.get("/subcategories");
export const fetchProducts = () => API.get("/products");
export const createCategory = (category) => API.post("/categories", category);
export const updateCategory = (id, category) =>
  API.put(`/categories/${id}`, category);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
export const createSubcategory = (subcategory) =>
  API.post("/subcategories", subcategory);
export const updateSubcategory = (id, subcategory) =>
  API.put(`/subcategories/${id}`, subcategory);
export const deleteSubcategory = (id) => API.delete(`/subcategories/${id}`);
export const createProduct = (product) => API.post("/products", product);
export const updateProduct = (id, product) =>
  API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// POS Endpoints
export const createSale = (sale) => API.post("/sales", sale);
export const getSales = (params) => API.get("/sales", { params });

// Interceptor for offline handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!navigator.onLine) {
      return Promise.reject({
        message: "Offline: Operation queued for sync",
        isOffline: true,
      });
    }
    return Promise.reject(error);
  }
);

export default API;
