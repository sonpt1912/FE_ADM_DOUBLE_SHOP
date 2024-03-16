import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../../config/CategoryApi";

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
  },
});

export default categorySlice.reducer;
