import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/inventorySlice";
import { translateLabel } from "../utils/urduUtils";

const CategoryManager = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.inventory);
  const [newCategory, setNewCategory] = useState("");

  React.useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      // In a real app: dispatch(createCategory(newCategory))
      setNewCategory("");
      alert(`Category "${newCategory}" created!`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="font-urdu text-2xl mb-6">
        {translateLabel("MANAGE_CATEGORIES")}
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder={translateLabel("NEW_CATEGORY")}
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
          {categories.map((category) => (
            <li
              key={category._id}
              className="bg-amber-50 p-4 rounded-lg shadow border border-amber-200"
            >
              <div className="font-urdu text-lg">{category.urduName}</div>
              <div className="text-gray-600 mt-1">{category.englishName}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryManager;
