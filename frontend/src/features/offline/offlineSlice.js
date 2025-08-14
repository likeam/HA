import { createSlice } from "@reduxjs/toolkit";

const offlineSlice = createSlice({
  name: "offline",
  initialState: {
    isOnline: navigator.onLine,
    pendingSync: 0,
  },
  reducers: {
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    incrementPendingSync: (state) => {
      state.pendingSync += 1;
    },
    decrementPendingSync: (state) => {
      state.pendingSync = Math.max(0, state.pendingSync - 1);
    },
    resetPendingSync: (state) => {
      state.pendingSync = 0;
    },
  },
});

export const {
  setOnlineStatus,
  incrementPendingSync,
  decrementPendingSync,
  resetPendingSync,
} = offlineSlice.actions;

export default offlineSlice.reducer;
