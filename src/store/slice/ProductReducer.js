import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProduct,
  createProduct,
  fetchDetailProduct,
} from "../../config/ProductApi";

const initialState = {
  products: [],
  error: null,
  status: "idle",
  pagination: {},
  detailProduct: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.products = action.payload.listData;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Save
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDetailProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailProduct = action.payload;
      })
      .addCase(fetchDetailProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default productSlice.reducer;
