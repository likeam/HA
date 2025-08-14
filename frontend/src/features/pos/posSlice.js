import { createSlice } from "@reduxjs/toolkit";

const posSlice = createSlice({
  name: "pos",
  initialState: {
    cart: [],
    salesHistory: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    saveTransaction: (state) => {
      const transaction = {
        id: Date.now().toString(),
        items: [...state.cart],
        total: state.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        timestamp: new Date().toISOString(),
        isSynced: state.offline?.isOnline || false,
      };
      state.salesHistory.unshift(transaction);
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  saveTransaction,
} = posSlice.actions;

export default posSlice.reducer;
