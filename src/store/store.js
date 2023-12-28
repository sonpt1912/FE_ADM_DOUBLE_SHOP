import { configureStore } from "@reduxjs/toolkit";
import KhachHangReducer from "./slice/KhachHangReducer";

const store = configureStore({
  reducer: {
    khachHang : KhachHangReducer,
  },
});

export default store;
