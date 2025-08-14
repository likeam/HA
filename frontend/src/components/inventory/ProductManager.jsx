import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../features/inventory/inventorySlice";
import ProductForm from "./ProductForm";
import DataTable from "../common/DataTable";
import SearchBar from "../common/SearchBar";

const ProductManager = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.inventory.products);
  const categories = useAppSelector((state) => state.inventory.categories);
  const subcategories = useAppSelector(
    (state) => state.inventory.subcategories
  );
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCreate = (product) => {
    dispatch(addProduct(product));
    setShowForm(false);
  };

  const handleUpdate = (product) => {
    dispatch(updateProduct(product));
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.includes(searchTerm)
  );

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "قیمت", accessor: "price" },
    { header: "اسٹاک", accessor: "stock" },
    { header: "زمرہ", accessor: "category" },
    { header: "عملیات", accessor: "actions" },
  ];

  const data = filteredProducts.map((product) => {
    const category = categories.find((c) => c.id === product.category);
    const subcategory = subcategories.find((s) => s.id === product.subcategory);

    return {
      ...product,
      price: `Rs ${product.price.toFixed(2)}`,
      category: category
        ? `${category.name} / ${subcategory?.name || ""}`
        : "نامعلوم",
      actions: (
        <div className="flex space-x-2">
          <button
            onClick={() => setEditingProduct(product)}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            ترمیم
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            حذف کریں
          </button>
        </div>
      ),
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">مصنوعات کا انتظام</h2>
        <div className="flex space-x-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="مصنوعات تلاش کریں..."
          />
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            نئی مصنوعات
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        renderRow={(row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{row.name}</td>
            <td className="border px-4 py-2">{row.price}</td>
            <td className="border px-4 py-2">{row.stock}</td>
            <td className="border px-4 py-2">{row.category}</td>
            <td className="border px-4 py-2">{row.actions}</td>
          </tr>
        )}
      />

      {(showForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductManager;
