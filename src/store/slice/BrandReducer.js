// sizeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchBrand } from "../../config/BrandApi";

const initialState = {
  brand: [],
  error: null,
  status: "idle",
  pagination: {},
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brand = action.payload.listData;
        state.pagination = {
          totalItems: action.payload.totalRecord,
        };
      })
      .addCase(fetchBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default brandSlice.reducer;
