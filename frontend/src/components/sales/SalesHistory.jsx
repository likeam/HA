import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import DataTable from "../common/DataTable";
import SaleDetail from "./SaleDetail";
import { FaEye } from "react-icons/fa";
import UrduText from "../common/UrduText";

const SalesHistory = () => {
  const sales = useAppSelector((state) => state.pos.salesHistory);
  const [selectedSale, setSelectedSale] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredSales = sales.filter((sale) => {
    const saleDate = new Date(sale.timestamp);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && saleDate < start) return false;
    if (end && saleDate > end) return false;
    return true;
  });

  const columns = [
    { header: "تاریخ", accessor: "date" },
    { header: "رسید نمبر", accessor: "id" },
    { header: "مصنوعات", accessor: "items" },
    { header: "کل رقم", accessor: "total" },
    { header: "عملیات", accessor: "actions" },
  ];

  const data = filteredSales.map((sale) => ({
    ...sale,
    date: new Date(sale.timestamp).toLocaleDateString(),
    items: sale.items.length,
    total: `Rs ${sale.total.toFixed(2)}`,
    actions: (
      <button
        onClick={() => setSelectedSale(sale)}
        className="px-2 py-1 bg-blue-500 text-white rounded flex items-center"
      >
        <FaEye className="mr-1" />
        <UrduText>دیکھیں</UrduText>
      </button>
    ),
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          <UrduText>فروخت کی تاریخ</UrduText>
        </h2>

        <div className="flex space-x-4">
          <div>
            <label className="block mb-1">
              <UrduText>سے تاریخ:</UrduText>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">
              <UrduText>تک تاریخ:</UrduText>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        renderRow={(row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{row.date}</td>
            <td className="border px-4 py-2">#{row.id.slice(0, 8)}</td>
            <td className="border px-4 py-2">{row.items}</td>
            <td className="border px-4 py-2">{row.total}</td>
            <td className="border px-4 py-2">{row.actions}</td>
          </tr>
        )}
      />

      {selectedSale && (
        <SaleDetail sale={selectedSale} onClose={() => setSelectedSale(null)} />
      )}
    </div>
  );
};

export default SalesHistory;
