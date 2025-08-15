import { createSlice } from "@reduxjs/toolkit";
import { saveBillOffline } from "../services/offlineDB";

const initialState = {
  cart: [],
  currentBill: null,
  status: "idle",
};

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity, weight } = action.payload;
      const existingIndex = state.cart.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingIndex >= 0) {
        const existing = state.cart[existingIndex];
        if (product.byWeight) {
          existing.weight = (existing.weight || 0) + (weight || 0);
        } else {
          existing.quantity = (existing.quantity || 0) + (quantity || 1);
        }
      } else {
        state.cart.push({
          product,
          quantity: product.byWeight ? null : quantity || 1,
          weight: product.byWeight ? weight || 0 : null,
          price: product.price,
        });
      }
    },
    updateItem: (state, action) => {
      const { index, quantity, weight } = action.payload;
      if (quantity !== undefined) state.cart[index].quantity = quantity;
      if (weight !== undefined) state.cart[index].weight = weight;
    },
    removeItem: (state, action) => {
      state.cart.splice(action.payload, 1);
    },
    finalizeBill: (state) => {
      const total = state.cart.reduce((sum, item) => {
        return (
          sum +
          (item.weight ? item.weight * item.price : item.quantity * item.price)
        );
      }, 0);

      state.currentBill = {
        items: [...state.cart],
        total,
        createdAt: new Date().toISOString(),
      };

      saveBillOffline(state.currentBill);
      state.cart = [];
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, updateItem, removeItem, finalizeBill, clearCart } =
  posSlice.actions;
export default posSlice.reducer;
