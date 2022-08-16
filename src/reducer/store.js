import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import newsSlice from "./newsSlice";

const persistConfig = {
  key: "root",
  // Local Storage에 저장
  // localStorage에 저장할 때 [ import storage from 'redux-persist/lib/storage' ]
  // Session에 저장할 때 [ import storageSession from 'redux-persist/lib/storage/session' ]
  storage,
  // storage에 저장할 reducer를 지정
};

const rootReducer = combineReducers({
  newsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
