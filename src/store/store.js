import { configureStore } from "@reduxjs/toolkit";
import colorSlice from "./slice/ColorSlice";
import aoSlice from "./slice/AoSlice";
import chatLieuSlice from "./slice/ChatLieuSlice";
import coAoSlice from "./slice/CoAoSlice";
import kichCoSlice from "./slice/KichCoSlice";

const store = configureStore({
  reducer: {
    colors: colorSlice.reducer,
    aos: aoSlice.reducer,
    chatLieus: chatLieuSlice.reducer,
    coAos: coAoSlice.reducer,
    kichCos: kichCoSlice.reducer,
  },
});

export default store;
