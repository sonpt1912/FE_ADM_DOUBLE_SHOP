import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";

import CustomerReducer from "./slice/CustomerReducer";
import RankReducer from "./slice/RankReducer";
import KichCoReducer from "./slice/KichCoReducer";
import ColorReducer from "./slice/ColorReducer";
import AuthReducer from "./slice/AuthReducer";
import ChatLieuReducer from "./slice/ChatLieuReducer";
import CollarReducer from "./slice/CollarReducer";
import VoucherReducer from "./slice/VoucherReducer";
import EmployeeReducer from "./slice/EmployeeReducer";
import DetailPromotionReducer from "./slice/DetailPromotionReducer";
import PromotionReducer from "./slice/PromotionReducer";
import ProductReducer from "./slice/ProductReducer";
import BrandReducer from "./slice/BrandReducer";
import CategoryReducer from "./slice/CategoryReducer";

const store = configureStore({
  reducer: {
    khachHang : CustomerReducer,
    rank : RankReducer,
    size : KichCoReducer,
    material: ChatLieuReducer,
    promotion: PromotionReducer,
    detailPromotion: DetailPromotionReducer,
    color: ColorReducer,
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