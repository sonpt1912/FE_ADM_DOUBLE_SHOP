import { createSlice } from "@reduxjs/toolkit";
import { createBill } from "../../config/PaymentApi";

const initialState = {
  bill: [],
  error: null,
  status: "idle",
};
const billSlice = createSlice({
  name: "bill",
  initialState: {
    loading: false,
    error: null,
    billData: null,
  },
  reducers: {},
  extraReducers: {
    [createBill.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.billData = null;
    },
    [createBill.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.billData = action.payload;
    },
    [createBill.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.billData = null;
    },
  },
});

export default billSlice.reducer;
