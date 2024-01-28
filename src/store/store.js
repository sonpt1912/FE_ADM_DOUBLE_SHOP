import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";

import KhachHangReducer from "./slice/KhachHangReducer";
import RankReducer from "./slice/RankReducer";
import KichCoReducer from "./slice/KichCoReducer";
import MauReducer from "./slice/MauReducer";
import AuthReducer from "./slice/AuthReducer";
import ChatLieuReducer from "./slice/ChatLieuReducer";
import KhuyenMaiReducer from "./slice/KhuyenMaiReducer";
const store = configureStore({
  reducer: {
    khachHang : KhachHangReducer,
    rank : RankReducer,
    size : KichCoReducer,
    material: ChatLieuReducer,
    promotion: KhuyenMaiReducer,
    color: MauReducer,
    auth: AuthReducer,
  },
  middleware: [...getDefaultMiddleware(), thunkMiddleware, thunk],
});

export default store;
