import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProduct,
  createProduct,
  fetchDetailProduct,
  uploadImage,
  updateDetailProduct
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
        state.products = action.payload.listData;
        state.pagination = {
          totalItems: action.payload.totalRecord,
        };
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
      // Detail
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
      })
      // Upload Image
      .addCase(uploadImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update 
      .addCase(updateDetailProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDetailProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailProduct = action.payload;
      })
      .addCase(updateDetailProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default productSlice.reducer;
