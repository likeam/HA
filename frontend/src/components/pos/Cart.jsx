import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  saveTransaction,
} from "../../features/pos/posSlice";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.pos.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isOnline = useAppSelector((state) => state.offline.isOnline);

  const handleQuantityChange = (id, delta) => {
    const item = cart.find((item) => item.id === id);
    const newQuantity = item.quantity + delta;

    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleCheckout = () => {
    dispatch(saveTransaction());
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">سہولت کارٹ</h2>

      <div className="max-h-96 overflow-y-auto mb-4">
        {cart.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>کارٹ خالی ہے</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">Rs {item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaMinus size={12} />
                  </button>

                  <span className="w-8 text-center">{item.quantity}</span>

                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaPlus size={12} />
                  </button>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t pt-3">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold">کل رقم:</span>
          <span className="font-bold text-lg">Rs {total.toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => dispatch(clearCart())}
            disabled={cart.length === 0}
            className={`py-2 px-4 rounded ${
              cart.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            صاف کریں
          </button>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className={`py-2 px-4 rounded ${
              cart.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isOnline ? "ادائیگی" : "آف لائن محفوظ کریں"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
