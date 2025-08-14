import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../../features/pos/posSlice";
import SearchBar from "../common/SearchBar";

const ProductGrid = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.inventory.products);
  const categories = useAppSelector((state) => state.inventory.categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.includes(searchTerm);
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
      })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="md:col-span-2">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="مصنوعات تلاش کریں..."
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">تمام زمرے</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleAddToCart(product)}
          >
            <div className="bg-gray-100 h-32 flex items-center justify-center">
              <span className="text-gray-400">تصویر</span>
            </div>
            <div className="p-2">
              <h3 className="font-medium truncate">{product.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-green-600 font-bold">
                  Rs {product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  {product.stock} دستیاب
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>کوئی مصنوعات نہیں ملی</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
