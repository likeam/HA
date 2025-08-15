import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { syncPendingBills } from "../services/offlineDB";

// Async thunk for syncing offline data
export const syncOfflineData = createAsyncThunk(
  "offline/syncData",
  async (_, { rejectWithValue }) => {
    try {
      const syncedCount = await syncPendingBills();
      return syncedCount;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isOnline: navigator.onLine,
  pendingItems: JSON.parse(localStorage.getItem("pendingBills") || "[]").length,
  lastSync: localStorage.getItem("lastSync") || null,
  syncStatus: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
  retryCount: 0,
};

const offlineSlice = createSlice({
  name: "offline",
  initialState,
  reducers: {
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;

      // Reset error when coming online
      if (action.payload && state.error) {
        state.error = null;
        state.retryCount = 0;
      }
    },
    updatePendingItems: (state) => {
      state.pendingItems = JSON.parse(
        localStorage.getItem("pendingBills") || "[]"
      ).length;
    },
    resetSyncStatus: (state) => {
      state.syncStatus = "idle";
      state.error = null;
    },
    incrementRetryCount: (state) => {
      state.retryCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncOfflineData.pending, (state) => {
        state.syncStatus = "pending";
        state.error = null;
      })
      .addCase(syncOfflineData.fulfilled, (state, action) => {
        state.syncStatus = "succeeded";
        state.pendingItems = 0;
        state.lastSync = new Date().toISOString();
        state.retryCount = 0;

        // Save last sync time to localStorage
        localStorage.setItem("lastSync", state.lastSync);
      })
      .addCase(syncOfflineData.rejected, (state, action) => {
        state.syncStatus = "failed";
        state.error = action.payload || "Sync failed";

        // Update pending items count in case some succeeded
        state.pendingItems = JSON.parse(
          localStorage.getItem("pendingBills") || "[]"
        ).length;
      });
  },
});

// Action creators
export const {
  setOnlineStatus,
  updatePendingItems,
  resetSyncStatus,
  incrementRetryCount,
} = offlineSlice.actions;

// Selectors
export const selectIsOnline = (state) => state.offline.isOnline;
export const selectPendingItems = (state) => state.offline.pendingItems;
export const selectLastSync = (state) => state.offline.lastSync;
export const selectSyncStatus = (state) => state.offline.syncStatus;
export const selectSyncError = (state) => state.offline.error;
export const selectRetryCount = (state) => state.offline.retryCount;

export default offlineSlice.reducer;
