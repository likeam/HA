import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { bulkUpdateStock } from "../../features/inventory/inventorySlice";
import DataTable from "../common/DataTable";

const StockAdjustment = () => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ product: "", quantity: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    if (newProduct.product && newProduct.quantity !== 0) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({ product: "", quantity: 0 });
    }
  };

  const handleRemove = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleUpdate = () => {
    const updates = products.map((p) => ({
      productId: p.product,
      quantity: p.quantity,
    }));

    dispatch(bulkUpdateStock(updates));
    setProducts([]);
  };

  const columns = [
    { header: "مصنوعات", accessor: "product" },
    { header: "تعداد", accessor: "quantity" },
    { header: "عملیات", accessor: "actions" },
  ];

  const data = products.map((p) => ({
    ...p,
    product: "Product Name", // Would come from API
    quantity: p.quantity > 0 ? `+${p.quantity}` : p.quantity,
    actions: (
      <button
        onClick={() => handleRemove(p.id)}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        حذف کریں
      </button>
    ),
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">اسٹاک ایڈجسٹمنٹ</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="مصنوعات تلاش کریں..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            type="number"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                quantity: parseInt(e.target.value) || 0,
              })
            }
            placeholder="تعداد"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <button
            onClick={handleAdd}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
          >
            شامل کریں
          </button>
        </div>
      </div>

      {products.length > 0 ? (
        <>
          <DataTable
            columns={columns}
            data={data}
            renderRow={(row) => (
              <tr key={row.id}>
                <td className="border px-4 py-2">{row.product}</td>
                <td className="border px-4 py-2">{row.quantity}</td>
                <td className="border px-4 py-2">{row.actions}</td>
              </tr>
            )}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              اسٹاک اپ ڈیٹ کریں
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>اسٹاک ایڈجسٹمنٹ کے لیے مصنوعات شامل کریں</p>
        </div>
      )}
    </div>
  );
};

export default StockAdjustment;
