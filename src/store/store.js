import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";

import KhachHangReducer from "./slice/KhachHangReducer";
import RankReducer from "./slice/RankReducer";
import KichCoReducer from "./slice/KichCoReducer";
import MauReducer from "./slice/MauReducer";
import AuthReducer from "./slice/AuthReducer";
import CollarReducer from "./slice/CollarReducer";

const store = configureStore({
  reducer: {
    khachHang: KhachHangReducer,
    rank: RankReducer,
    size: KichCoReducer,
    color: MauReducer,
    collar:CollarReducer,
    auth: AuthReducer,
  },
  middleware: [...getDefaultMiddleware(), thunkMiddleware, thunk],
});

export default store;