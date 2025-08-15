import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/inventorySlice";
import { translateLabel } from "../utils/urduUtils";

const ProductManager = () => {
  const dispatch = useDispatch();
  const { subcategories, products, status } = useSelector(
    (state) => state.inventory
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [newProduct, setNewProduct] = useState({
    urduName: "",
    englishName: "",
    price: "",
    byWeight: false,
  });

  React.useEffect(() => {
    if (selectedSubcategory) {
      dispatch(fetchProducts(selectedSubcategory));
    }
  }, [dispatch, selectedSubcategory]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.urduName.trim() && selectedSubcategory) {
      // In a real app: dispatch(createProduct(selectedSubcategory, newProduct))
      setNewProduct({
        urduName: "",
        englishName: "",
        price: "",
        byWeight: false,
      });
      alert(`Product "${newProduct.urduName}" created!`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="font-urdu text-2xl mb-6">
        {translateLabel("MANAGE_PRODUCTS")}
      </h2>

      <div className="mb-6">
        <label className="block mb-2 font-urdu">
          {translateLabel("SELECT_SUBCATEGORY")}
        </label>
        <select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded text-right"
        >
          <option value="">{translateLabel("SELECT")}</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.urduName}
            </option>
          ))}
        </select>
      </div>

      {selectedSubcategory && (
        <>
          <form
            onSubmit={handleSubmit}
            className="mb-6 bg-amber-50 p-4 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-urdu">
                  {translateLabel("URDU_NAME")}
                </label>
                <input
                  type="text"
                  name="urduName"
                  value={newProduct.urduName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded text-right"
                  dir="auto"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  {translateLabel("ENGLISH_NAME")}
                </label>
                <input
                  type="text"
                  name="englishName"
                  value={newProduct.englishName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2">{translateLabel("PRICE")}</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="byWeight"
                  checked={newProduct.byWeight}
                  onChange={handleChange}
                  className="mr-2 h-5 w-5"
                  id="byWeight"
                />
                <label htmlFor="byWeight" className="font-urdu">
                  {translateLabel("BY_WEIGHT")}
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-amber-600 text-white px-6 py-3 rounded font-urdu"
            >
              {translateLabel("ADD_PRODUCT")}
            </button>
          </form>

          {status === "loading" ? (
            <p>{translateLabel("LOADING")}...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-amber-50 p-4 rounded-lg shadow border border-amber-200"
                >
                  <div className="font-urdu text-lg">{product.urduName}</div>
                  <div className="text-gray-600">{product.englishName}</div>
                  <div className="mt-2">
                    <span className="font-medium">{product.price} روپے</span>
                    {product.byWeight && (
                      <span className="ml-2 text-sm">/کلو</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductManager;
