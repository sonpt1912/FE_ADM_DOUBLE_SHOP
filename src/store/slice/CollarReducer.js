// sizeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCollars,saveCollar,updateCollar } from "../../config/api";

const initialState = {
  collars: [],
  error: null,
  status: "idle",
  pagination: {},
};

const collarSlice = createSlice({
  name: "collars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCollars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collars = action.payload.listData;
        state.pagination = {
          totalItems: action.payload.totalRecord,
        };
      })
      .addCase(fetchCollars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Save
      .addCase(saveCollar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveCollar.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(saveCollar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update
      .addCase(updateCollar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCollar.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateCollar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default collarSlice.reducer;