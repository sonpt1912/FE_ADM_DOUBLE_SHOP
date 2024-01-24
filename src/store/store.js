import { configureStore } from "@reduxjs/toolkit";
import KhachHangReducer from "./slice/KhachHangReducer";
import RankReducer from "./slice/RankReducer";
import KichCoReducer from "./slice/KichCoReducer";
import ChatLieuReducer from "./slice/ChatLieuReducer";
import KhuyenMaiReducer from "./slice/KhuyenMaiReducer";
const store = configureStore({
  reducer: {
    khachHang : KhachHangReducer,
    rank : RankReducer,
    size : KichCoReducer,
    material: ChatLieuReducer,
    promotion: KhuyenMaiReducer
  },
});

export default store;
