import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/posSlice";
import UrduLabel from "../common/UrduLabel";
import WeightInputModal from "./WeightInputModal";

const ProductSelector = ({ products }) => {
  const dispatch = useDispatch();
  const [showWeightModal, setShowWeightModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleProductSelect = (product) => {
    if (product.byWeight) {
      setSelectedProduct(product);
      setShowWeightModal(true);
    } else {
      dispatch(addItem({ product }));
    }
  };

  const handleWeightSubmit = (weight) => {
    if (weight && selectedProduct) {
      dispatch(
        addItem({ product: selectedProduct, weight: parseFloat(weight) })
      );
    }
    setShowWeightModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map((product) => (
        <button
          key={product._id}
          onClick={() => handleProductSelect(product)}
          className="bg-amber-50 hover:bg-amber-100 p-3 rounded-lg shadow border border-amber-200"
        >
          <div className="font-urdu text-lg">{product.urduName}</div>
          <div className="text-gray-700 mt-1">
            Rs. {product.price} {product.byWeight ? "/kg" : ""}
          </div>
        </button>
      ))}

      <WeightInputModal
        isOpen={showWeightModal}
        onClose={() => setShowWeightModal(false)}
        onSubmit={handleWeightSubmit}
        productName={selectedProduct?.urduName}
      />
    </div>
  );
};

export default ProductSelector;
