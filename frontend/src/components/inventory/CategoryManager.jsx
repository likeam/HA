import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../features/inventory/inventorySlice";
import DataTable from "../common/DataTable";

const CategoryManager = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.inventory.categories);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    if (newCategory.trim()) {
      dispatch(addCategory({ name: newCategory }));
      setNewCategory("");
    }
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditValue(name);
  };

  const handleUpdate = (id) => {
    if (editValue.trim()) {
      dispatch(updateCategory({ id, name: editValue }));
      setEditingId(null);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "عملیات", accessor: "actions" },
  ];

  const data = categories.map((category) => ({
    ...category,
    actions: (
      <div className="flex space-x-2">
        {editingId === category.id ? (
          <>
            <button
              onClick={() => handleUpdate(category.id)}
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
              onClick={() => startEditing(category.id, category.name)}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              ترمیم
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              حذف کریں
            </button>
          </>
        )}
      </div>
    ),
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">زمرہ جات کا انتظام</h2>

      <div className="flex mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="نیا زمرہ شامل کریں"
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-r"
        >
          شامل کریں
        </button>
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
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-1 border rounded"
                />
              ) : (
                row.name
              )}
            </td>
            <td className="border px-4 py-2">{row.actions}</td>
          </tr>
        )}
      />
    </div>
  );
};

export default CategoryManager;
