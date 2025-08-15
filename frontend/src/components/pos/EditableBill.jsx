import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem, removeItem, finalizeBill } from "../../features/posSlice";
import UrduLabel from "../common/UrduLabel";
import { calculateBillTotal } from "../../utils/billCalculator";

const EditableBill = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.pos.cart);
  const total = calculateBillTotal(cart);

  const handleUpdate = (index, field) => (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      dispatch(updateItem({ index, [field]: value }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">
                <UrduLabel textKey="ITEM_NAME" defaultText="نام" />
              </th>
              <th className="p-2">
                <UrduLabel textKey="QUANTITY" defaultText="مقدار" />
              </th>
              <th className="p-2">
                <UrduLabel textKey="PRICE" defaultText="فی یونٹ" />
              </th>
              <th className="p-2">
                <UrduLabel textKey="TOTAL" defaultText="کل" />
              </th>
              <th className="p-2">
                <UrduLabel textKey="ACTION" defaultText="عمل" />
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 font-urdu">{item.product.urduName}</td>
                <td className="p-2">
                  {item.product.byWeight ? (
                    <input
                      type="number"
                      value={item.weight}
                      onChange={handleUpdate(index, "weight")}
                      className="w-24 border rounded p-1 text-center"
                      min="0.1"
                      step="0.1"
                    />
                  ) : (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={handleUpdate(index, "quantity")}
                      className="w-24 border rounded p-1 text-center"
                      min="1"
                    />
                  )}
                </td>
                <td className="p-2">Rs. {item.price.toFixed(2)}</td>
                <td className="p-2">
                  Rs.{" "}
                  {(item.product.byWeight
                    ? item.weight * item.price
                    : item.quantity * item.price
                  ).toFixed(2)}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => dispatch(removeItem(index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <UrduLabel textKey="REMOVE" defaultText="حذف کریں" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <UrduLabel textKey="TOTAL_AMOUNT" defaultText="کل رقم:" />
          <span className="ml-2">Rs. {total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => {
            dispatch(finalizeBill());
            // Print handling would be triggered in parent component
          }}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-urdu text-lg"
          disabled={cart.length === 0}
        >
          <UrduLabel textKey="FINALIZE_BILL" defaultText="بل مکمل کریں" />
        </button>
      </div>
    </div>
  );
};

export default EditableBill;
