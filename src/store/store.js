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
import CollarReducer from "./slice/CollarReducer";
import VoucherReducer from "./slice/VoucherReducer";
import EmployeeReducer from "./slice/EmployeeReducer";
import DetailPromotionReducer from "./slice/DetailPromotionReducer";

const store = configureStore({
  reducer: {
    khachHang : KhachHangReducer,
    rank : RankReducer,
    size : KichCoReducer,
    material: ChatLieuReducer,
    promotion: KhuyenMaiReducer,
    detailPromotion: DetailPromotionReducer,
    color: MauReducer,
    collar: CollarReducer,
    auth: AuthReducer,
    voucher:VoucherReducer,
    employee: EmployeeReducer
  },
  middleware: [...getDefaultMiddleware(), thunkMiddleware, thunk],
});

export default store;