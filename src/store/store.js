import { configureStore } from "@reduxjs/toolkit";
import colorSlice from "./slice/ColorSlice";

const store = configureStore({
  reducer: {
    colors: colorSlice.reducer,
  },
});

export default store;
