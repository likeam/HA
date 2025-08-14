export const validateProduct = (product) => {
  const errors = {};

  if (!product.name || product.name.trim() === "") {
    errors.name = "Product name is required";
  }

  if (!product.price || isNaN(product.price) || product.price <= 0) {
    errors.price = "Valid price is required";
  }

  if (!product.stock || isNaN(product.stock) || product.stock < 0) {
    errors.stock = "Valid stock quantity is required";
  }

  if (!product.category) {
    errors.category = "Category is required";
  }

  if (!product.subcategory) {
    errors.subcategory = "Subcategory is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSale = (sale) => {
  const errors = {};

  if (!sale.items || !Array.isArray(sale.items) || sale.items.length === 0) {
    errors.items = "At least one item is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
