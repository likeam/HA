import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchSubcategories,
  fetchProducts,
} from "../features/inventorySlice";
import ProductGrid from "../components/ProductGrid";
import BillSummary from "../components/BillSummary";
import PrintTemplate from "../components/PrintTemplate";
import { useReactToPrint } from "react-to-print";
import { translateLabel } from "../utils/urduUtils";
import LoadingSpinner from "../components/LoadingSpinner";

const POSPage = () => {
  const dispatch = useDispatch();
  const {
    categories,
    subcategories,
    products,
    status: inventoryStatus,
  } = useSelector((state) => state.inventory);

  const { currentBill } = useSelector((state) => state.pos);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const printRef = React.useRef();

  React.useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  React.useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchSubcategories(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  React.useEffect(() => {
    if (selectedSubcategory) {
      dispatch(fetchProducts(selectedSubcategory));
    }
  }, [dispatch, selectedSubcategory]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Bill_${new Date().toISOString()}`,
  });

  if (inventoryStatus === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {currentBill && (
        <div className="hidden">
          <PrintTemplate ref={printRef} bill={currentBill} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-urdu">
                  {translateLabel("CATEGORY")}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory("");
                  }}
                  className="w-full p-3 border border-gray-300 rounded text-right"
                >
                  <option value="">{translateLabel("ALL_CATEGORIES")}</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.urduName}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCategory && (
                <div>
                  <label className="block mb-2 font-urdu">
                    {translateLabel("SUBCATEGORY")}
                  </label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded text-right"
                  >
                    <option value="">
                      {translateLabel("ALL_SUBCATEGORIES")}
                    </option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.urduName}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <ProductGrid products={products} />
          </div>
        </div>

        <div>
          <BillSummary />

          {currentBill && (
            <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
              <button
                onClick={handlePrint}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-urdu text-lg hover:bg-green-700"
              >
                {translateLabel("PRINT_BILL")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default POSPage;
