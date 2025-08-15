import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { syncPendingBills } from "../services/offlineDB";

export const syncOfflineData = createAsyncThunk(
  "sync/offlineData",
  async () => {
    return await syncPendingBills();
  }
);

const syncSlice = createSlice({
  name: "sync",
  initialState: {
    status: "idle",
    lastSync: null,
    pendingItems: 0,
    error: null,
  },
  reducers: {
    setPendingItems: (state, action) => {
      state.pendingItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncOfflineData.pending, (state) => {
        state.status = "syncing";
      })
      .addCase(syncOfflineData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastSync = new Date().toISOString();
        state.pendingItems = 0;
      })
      .addCase(syncOfflineData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPendingItems } = syncSlice.actions;
export default syncSlice.reducer;
