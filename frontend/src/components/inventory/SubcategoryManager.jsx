import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../../features/inventory/inventorySlice";
import DataTable from "../common/DataTable";

const SubcategoryManager = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.inventory.categories);
  const subcategories = useAppSelector(
    (state) => state.inventory.subcategories
  );
  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    categoryId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState({ name: "", categoryId: "" });

  const handleAdd = () => {
    if (newSubcategory.name.trim() && newSubcategory.categoryId) {
      dispatch(addSubcategory(newSubcategory));
      setNewSubcategory({ name: "", categoryId: "" });
    }
  };

  const startEditing = (subcategory) => {
    setEditingId(subcategory.id);
    setEditValue({
      name: subcategory.name,
      categoryId: subcategory.category,
    });
  };

  const handleUpdate = (id) => {
    if (editValue.name.trim() && editValue.categoryId) {
      dispatch(updateSubcategory({ id, ...editValue }));
      setEditingId(null);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSubcategory(id));
  };

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "زمرہ", accessor: "category" },
    { header: "عملیات", accessor: "actions" },
  ];

  const data = subcategories.map((subcategory) => {
    const category = categories.find((c) => c.id === subcategory.category);
    return {
      ...subcategory,
      category: category ? category.name : "نامعلوم",
      actions: (
        <div className="flex space-x-2">
          {editingId === subcategory.id ? (
            <>
              <button
                onClick={() => handleUpdate(subcategory.id)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                محفوظ کریں
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="px-2 py-1 bg-gray-500 text-white rounded"
              >
                منسوخ کریں
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => startEditing(subcategory)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                ترمیم
              </button>
              <button
                onClick={() => handleDelete(subcategory.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                حذف کریں
              </button>
            </>
          )}
        </div>
      ),
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">ذیلی زمرہ جات کا انتظام</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <input
            type="text"
            value={newSubcategory.name}
            onChange={(e) =>
              setNewSubcategory({ ...newSubcategory, name: e.target.value })
            }
            placeholder="نیا ذیلی زمرہ نام"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <select
            value={newSubcategory.categoryId}
            onChange={(e) =>
              setNewSubcategory({
                ...newSubcategory,
                categoryId: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">زمرہ منتخب کریں</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-3">
          <button
            onClick={handleAdd}
            className="w-full bg-green-500 text-white px-4 py-2 rounded"
          >
            ذیلی زمرہ شامل کریں
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        renderRow={(row) => (
          <tr key={row.id}>
            <td className="border px-4 py-2">
              {editingId === row.id ? (
                <input
                  type="text"
                  value={editValue.name}
                  onChange={(e) =>
                    setEditValue({ ...editValue, name: e.target.value })
                  }
                  className="w-full p-1 border rounded"
                />
              ) : (
                row.name
              )}
            </td>
            <td className="border px-4 py-2">
              {editingId === row.id ? (
                <select
                  value={editValue.categoryId}
                  onChange={(e) =>
                    setEditValue({ ...editValue, categoryId: e.target.value })
                  }
                  className="w-full p-1 border rounded"
                >
                  <option value="">زمرہ منتخب کریں</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                row.category
              )}
            </td>
            <td className="border px-4 py-2">{row.actions}</td>
          </tr>
        )}
      />
    </div>
  );
};

export default SubcategoryManager;
