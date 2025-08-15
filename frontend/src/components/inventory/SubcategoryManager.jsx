import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategories } from "../features/inventorySlice";
import { translateLabel } from "../utils/urduUtils";

const SubcategoryManager = () => {
  const dispatch = useDispatch();
  const { categories, subcategories, status } = useSelector(
    (state) => state.inventory
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");

  React.useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchSubcategories(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSubcategory.trim() && selectedCategory) {
      // In a real app: dispatch(createSubcategory(selectedCategory, newSubcategory))
      setNewSubcategory("");
      alert(`Subcategory "${newSubcategory}" created!`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="font-urdu text-2xl mb-6">
        {translateLabel("MANAGE_SUBCATEGORIES")}
      </h2>

      <div className="mb-6">
        <label className="block mb-2 font-urdu">
          {translateLabel("SELECT_CATEGORY")}
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded text-right"
        >
          <option value="">{translateLabel("SELECT")}</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.urduName}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                placeholder={translateLabel("NEW_SUBCATEGORY")}
                className="flex-1 p-3 border border-gray-300 rounded text-right"
                dir="auto"
              />
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 py-3 rounded font-urdu"
              >
                {translateLabel("ADD")}
              </button>
            </div>
          </form>

          {status === "loading" ? (
            <p>{translateLabel("LOADING")}...</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategories.map((subcategory) => (
                <li
                  key={subcategory._id}
                  className="bg-amber-50 p-4 rounded-lg shadow border border-amber-200"
                >
                  <div className="font-urdu text-lg">
                    {subcategory.urduName}
                  </div>
                  <div className="text-gray-600 mt-1">
                    {subcategory.englishName}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default SubcategoryManager;
