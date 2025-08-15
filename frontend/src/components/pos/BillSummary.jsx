import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem, removeItem, finalizeBill } from "../features/posSlice";
import { translateLabel, formatUrduNumber } from "../utils/urduUtils";
import { formatCurrency } from "../utils/currency";

const BillSummary = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.pos.cart);

  const totalAmount = cart.reduce((total, item) => {
    return (
      total +
      (item.weight ? item.weight * item.price : item.quantity * item.price)
    );
  }, 0);

  const handleUpdate = (index, field) => (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      dispatch(updateItem({ index, [field]: value }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-urdu text-xl">{translateLabel("CURRENT_BILL")}</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-right font-urdo">
                {translateLabel("ITEM")}
              </th>
              <th className="p-2 text-right">{translateLabel("QTY")}</th>
              <th className="p-2 text-right">{translateLabel("PRICE")}</th>
              <th className="p-2 text-right">{translateLabel("TOTAL")}</th>
              <th className="p-2">{translateLabel("ACTION")}</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 font-urdu text-right">
                  {item.product.urduName}
                </td>
                <td className="p-2">
                  {item.product.byWeight ? (
                    <input
                      type="number"
                      value={item.weight}
                      onChange={handleUpdate(index, "weight")}
                      className="w-20 border rounded p-1 text-center"
                      min="0.1"
                      step="0.1"
                    />
                  ) : (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={handleUpdate(index, "quantity")}
                      className="w-20 border rounded p-1 text-center"
                      min="1"
                    />
                  )}
                </td>
                <td className="p-2 text-right">{formatCurrency(item.price)}</td>
                <td className="p-2 text-right">
                  {formatCurrency(
                    item.product.byWeight
                      ? item.weight * item.price
                      : item.quantity * item.price
                  )}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => dispatch(removeItem(index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    {translateLabel("REMOVE")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-urdu text-lg">{translateLabel("TOTAL")}:</span>
          <span className="text-xl font-bold">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        <button
          onClick={() => dispatch(finalizeBill())}
          disabled={cart.length === 0}
          className={`w-full py-3 rounded-lg text-white font-urdu text-lg ${
            cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {translateLabel("FINALIZE_BILL")}
        </button>
      </div>
    </div>
  );
};

export default BillSummary;
