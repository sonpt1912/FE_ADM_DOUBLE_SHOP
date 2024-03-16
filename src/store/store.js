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
import ProductReducer from "./slice/ProductReducer";
import BrandReducer from "./slice/BrandReducer";
import CategoryReducer from "./slice/CategoryReducer";

const store = configureStore({
  reducer: {
    khachHang : KhachHangReducer,
    rank : RankReducer,
    size : KichCoReducer,
    material: ChatLieuReducer,
    promotion: KhuyenMaiReducer,
    color: MauReducer,
    collar: CollarReducer,
    auth: AuthReducer,
    voucher:VoucherReducer,
    employee: EmployeeReducer,
    products : ProductReducer,
    brand: BrandReducer,
    category : CategoryReducer
  },
  middleware: [...getDefaultMiddleware(), thunkMiddleware, thunk],
});

export default store;