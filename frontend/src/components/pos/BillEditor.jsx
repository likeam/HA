import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateQuantity, removeFromCart } from "../../features/pos/posSlice";
import UrduText from "../common/UrduText";

const BillEditor = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.pos.cart);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center text-gray-500">
        <UrduText>بل میں ترمیم کرنے کے لیے مصنوعات شامل کریں</UrduText>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">
        <UrduText>بل میں ترمیم کریں</UrduText>
      </h2>

      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-3"
          >
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-600">
                Rs {item.price.toFixed(2)} فی یونٹ
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                }
                className="w-20 p-1 border rounded text-center"
              />

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                <UrduText>حذف کریں</UrduText>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillEditor;
