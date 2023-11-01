import { configureStore } from "@reduxjs/toolkit";
import colorSlice from "./slice/ColorSlice";
import aoSlice from "./slice/AoSlice";
import chatLieuSlice from "./slice/ChatLieuSlice";
import kichCoSlice from "./slice/KichCoSlice";
import coAoSlice from "./slice/CoAoSlice";

const store = configureStore({
  reducer: {
    colors: colorSlice.reducer,
    aos: aoSlice.reducer,
    chatLieus: chatLieuSlice.reducer,
    kichCos: kichCoSlice.reducer,
    coAos: coAoSlice.reducer,
  },
});



export default store;
