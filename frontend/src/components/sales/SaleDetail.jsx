import React from "react";
import UrduText from "../common/UrduText";
import { FaTimes } from "react-icons/fa";

const SaleDetail = ({ sale, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            <UrduText>رسید کی تفصیل</UrduText> #{sale.id.slice(0, 8)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="mb-4">
          <p>
            <span className="font-medium">
              <UrduText>تاریخ:</UrduText>
            </span>
            {new Date(sale.timestamp).toLocaleString()}
          </p>
          <p>
            <span className="font-medium">
              <UrduText>حالت:</UrduText>
            </span>
            {sale.isSynced ? " Synced" : " Offline"}
          </p>
        </div>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">
                <UrduText>مصنوعات</UrduText>
              </th>
              <th className="border px-4 py-2 text-center">
                <UrduText>مقدار</UrduText>
              </th>
              <th className="border px-4 py-2 text-right">
                <UrduText>کل</UrduText>
              </th>
            </tr>
          </thead>
          <tbody>
            {sale.items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2 text-center">
                  {item.quantity}
                </td>
                <td className="border px-4 py-2 text-right">
                  Rs {(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="border px-4 py-2 text-right font-bold">
                <UrduText>کل رقم:</UrduText>
              </td>
              <td className="border px-4 py-2 text-right font-bold">
                Rs {sale.total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            <UrduText>بند کریں</UrduText>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleDetail;
