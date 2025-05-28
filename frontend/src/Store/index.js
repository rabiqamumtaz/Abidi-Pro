  // src/Store/index.js or src/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import authReducer from "./authSlice";
import attendanceTImerSlice from '../api/attendanceTimer'; // correct spelling?

// 🧩 Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  attendanceTimer: attendanceTImerSlice,
});

// 🔐 Persistence config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "attendanceTimer"], // Reducers to persist
};

// 🎯 Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🏗 Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required by redux-persist
    }),
});

// 🚀 Create persistor
const persistor = persistStore(store);

export { store, persistor };