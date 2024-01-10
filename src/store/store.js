import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import KhachHangReducer from "./slice/KhachHangReducer";
import RankReducer from "./slice/RankReducer";
import KichCoReducer from "./slice/KichCoReducer";
import MauReducer from "./slice/MauReducer";

const store = configureStore({
  reducer: {
    khachHang: KhachHangReducer,
    rank: RankReducer,
    size: KichCoReducer
    color: MauReducer
  },
  middleware: [...getDefaultMiddleware(), thunkMiddleware],
});

export default store;
