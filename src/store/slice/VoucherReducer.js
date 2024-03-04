// sizeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchVouchers,updateVoucher,saveVoucher } from "../../config/api2";

const initialState = {
  vouchers: [],
  error: null,
  status: "idle",
  pagination: {},
};

const voucherSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers = action.payload.listData;
        state.pagination = {
          totalItems: action.payload.totalRecord,
        };
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Save
      .addCase(saveVoucher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveVoucher.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(saveVoucher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update
      .addCase(updateVoucher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVoucher.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateVoucher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default voucherSlice.reducer;