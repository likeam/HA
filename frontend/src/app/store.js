import { configureStore } from "@reduxjs/toolkit";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import inventoryReducer from "../features/inventory/inventorySlice";
import posReducer from "../features/pos/posSlice";
import offlineReducer from "../features/offline/offlineSlice";

// Create the store
export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    pos: posReducer,
    offline: offlineReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  enhancers: [() => offline(offlineConfig)],
});

// Export store types
/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @typedef {typeof store.dispatch} AppDispatch
 */

// Export store instance and utility functions
export const getState = () => store.getState();
export const dispatch = store.dispatch;
