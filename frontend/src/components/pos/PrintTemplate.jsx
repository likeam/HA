import React, { forwardRef } from "react";
import { formatUrduNumber } from "../utils/urduUtils";
import { formatUrduCurrency } from "../utils/currency";

const PrintTemplate = forwardRef(({ bill }, ref) => {
  return (
    <div ref={ref} className="p-6 font-urdu" dir="rtl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">رسید</h1>
        <p className="text-gray-600">
          تاریخ: {new Date(bill.createdAt).toLocaleString("ur-PK")}
        </p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">نام</th>
            <th className="border p-2">مقدار</th>
            <th className="border p-2">قیمت</th>
            <th className="border p-2">کل</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.product.urduName}</td>
              <td className="border p-2 text-center">
                {item.weight
                  ? `${formatUrduNumber(item.weight)} کلو`
                  : formatUrduNumber(item.quantity)}
              </td>
              <td className="border p-2 text-center">
                {formatUrduNumber(item.price)}
              </td>
              <td className="border p-2 text-center">
                {formatUrduCurrency(
                  item.weight
                    ? item.weight * item.price
                    : item.quantity * item.price
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-end">
        <div className="text-xl font-bold">
          کل رقم: {formatUrduCurrency(bill.total)}
        </div>
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p>شکریہ! دوبارہ تشریف لائیں</p>
      </div>
    </div>
  );
});

export default PrintTemplate;
