import React from "react";
import { useAppSelector } from "../../app/hooks";
import UrduText from "../common/UrduText";

const UrduBillPreview = () => {
  const cart = useAppSelector((state) => state.pos.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <UrduText className="text-gray-500">
          بل دیکھنے کے لیے مصنوعات شامل کریں
        </UrduText>
      </div>
    );
  }

  return (
    <div
      className="bg-white p-6 rounded-lg shadow font-urdu"
      style={{ direction: "rtl" }}
    >
      <h1 className="text-2xl font-bold text-center mb-4">
        <UrduText>رسید</UrduText>
      </h1>

      <div className="mb-4">
        <p>
          <UrduText>تاریخ:</UrduText> {new Date().toLocaleDateString("ur-PK")}
        </p>
        <p>
          <UrduText>رسید نمبر:</UrduText> #{Math.floor(Math.random() * 10000)}
        </p>
      </div>

      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="py-2 text-right">
              <UrduText>اشیا</UrduText>
            </th>
            <th className="py-2 text-center">
              <UrduText>مقدار</UrduText>
            </th>
            <th className="py-2 text-left">
              <UrduText>قیمت</UrduText>
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2 text-right">{item.name}</td>
              <td className="py-2 text-center">{item.quantity}</td>
              <td className="py-2 text-left">
                {(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center border-t-2 border-gray-300 pt-4">
        <span className="text-xl font-bold">
          <UrduText>کل رقم:</UrduText>
        </span>
        <span className="text-xl font-bold">{total.toFixed(2)}</span>
      </div>

      <div className="mt-8 text-center text-lg">
        <UrduText>شکریہ! دوبارہ تشریف لائیں</UrduText>
      </div>
    </div>
  );
};

export default UrduBillPreview;
