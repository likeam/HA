import React, { useState, useEffect } from "react";

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    barcode: "",
    category: "",
    subcategory: "",
  });

  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
        barcode: product.barcode || "",
        category: product.category,
        subcategory: product.subcategory,
      });

      // In a real app, fetch subcategories based on selected category
      setSubcategories([]);
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        barcode: "",
        category: "",
        subcategory: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "category") {
      // Fetch subcategories when category changes
      setFormData((prev) => ({ ...prev, subcategory: "" }));
      setSubcategories([]); // Replace with actual API call
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {product ? "مصنوعات کی ترمیم" : "نئی مصنوعات شامل کریں"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block mb-1">نام *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1">تفصیل</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="2"
            />
          </div>

          <div>
            <label className="block mb-1">قیمت *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">اسٹاک *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">بارکوڈ</label>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">زمرہ *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">منتخب کریں</option>
              {/* Categories would be mapped here */}
            </select>
          </div>

          <div>
            <label className="block mb-1">ذیلی زمرہ *</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              disabled={!formData.category}
            >
              <option value="">منتخب کریں</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              منسوخ کریں
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              {product ? "اپ ڈیٹ کریں" : "تخلیق کریں"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
