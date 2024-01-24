import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";

import KhachHangReducer from "./slice/KhachHangReducer";
import RankReducer from "./slice/RankReducer";
import KichCoReducer from "./slice/KichCoReducer";
import MauReducer from "./slice/MauReducer";
<<<<<<< HEAD
import CollarReducer from "./slice/CollarReducer";
=======
import AuthReducer from "./slice/AuthReducer";
>>>>>>> 46e33ce2e3dd4f260188ea2de9a7fe5e181bd377

const store = configureStore({
  reducer: {
    khachHang: KhachHangReducer,
    rank: RankReducer,
    size: KichCoReducer,
    color: MauReducer,
<<<<<<< HEAD
    collar: CollarReducer
=======
    auth: AuthReducer,
>>>>>>> 46e33ce2e3dd4f260188ea2de9a7fe5e181bd377
  },
  middleware: [...getDefaultMiddleware(), thunkMiddleware, thunk],
});

export default store;
