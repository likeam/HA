import api from "./api";

export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubcategories = async (categoryId) => {
  try {
    const response = await api.get(`/subcategories?category=${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (subcategoryId) => {
  try {
    const response = await api.get(`/products?subcategory=${subcategoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
