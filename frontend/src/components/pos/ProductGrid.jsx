import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/posSlice";
import { translateLabel } from "../utils/urduUtils";

const ProductGrid = ({ products }) => {
  const dispatch = useDispatch();
  const [weightInput, setWeightInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    if (product.byWeight) {
      setSelectedProduct(product);
      setWeightInput("");
    } else {
      dispatch(addItem({ product }));
    }
  };

  const handleWeightSubmit = () => {
    if (selectedProduct && weightInput) {
      const weight = parseFloat(weightInput);
      if (!isNaN(weight) && weight > 0) {
        dispatch(
          addItem({
            product: selectedProduct,
            weight,
          })
        );
        setSelectedProduct(null);
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => (
          <button
            key={product._id}
            onClick={() => handleProductClick(product)}
            className="bg-amber-50 hover:bg-amber-100 p-3 rounded-lg shadow border border-amber-200 transition-colors"
          >
            <div className="font-urdu text-lg">{product.urduName}</div>
            <div className="text-gray-700 mt-1">
              {product.price} روپے {product.byWeight ? "/کلو" : ""}
            </div>
          </button>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="font-urdu text-xl mb-4">
              {selectedProduct.urduName} کا وزن درج کریں (کلوگرام)
            </h3>
            <input
              type="number"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-right text-lg"
              placeholder="وزن درج کریں"
              step="0.1"
              min="0.1"
              autoFocus
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                {translateLabel("CANCEL")}
              </button>
              <button
                onClick={handleWeightSubmit}
                className="px-4 py-2 bg-amber-600 text-white rounded"
              >
                {translateLabel("ADD")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
