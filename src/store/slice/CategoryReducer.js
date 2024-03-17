import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory, saveCategory, updateCategory } from "../../config/CategoryApi";

const initialState = {
  category: [],
  error: null,
  status: "idle",
  pagination: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Succeeded",action.payload );
        state.category = action.payload.listData;
        state.pagination = {
          totalItems: action.payload.totalRecord,
        };
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  // Save
  .addCase(saveCategory.pending, (state) => {
    state.status = "loading";
  })
  .addCase(saveCategory.fulfilled, (state, action) => {
    state.status = "succeeded";
  })
  .addCase(saveCategory.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  })
  // Update
  .addCase(updateCategory.pending, (state) => {
    state.status = "loading";
  })
  .addCase(updateCategory.fulfilled, (state, action) => {
    state.status = "succeeded";
  })
  .addCase(updateCategory.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  });
},
});


export default categorySlice.reducer;
