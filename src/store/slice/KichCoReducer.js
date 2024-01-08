// sizeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchSizes, saveSize } from "../../config/api";

const initialState = {
  sizes: [],
  error: null,
  status: "idle",
  pagination: {},
};


const sizeSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSizes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sizes = action.payload.listData;
        state.pagination = {
          page: 0,
          pageSize: 5,
          totalItems: action.payload.totalRecord,
        };
      })
      .addCase(fetchSizes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveSize.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveSize.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(saveSize.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default sizeSlice.reducer;
