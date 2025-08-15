import { configureStore } from "@reduxjs/toolkit";
import posReducer from "../features/posSlice";
import inventoryReducer from "../features/inventorySlice";
import offlineReducer from "../features/offlineSlice";

export default configureStore({
  reducer: {
    pos: posReducer,
    inventory: inventoryReducer,
    offline: offlineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
