import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCustomer,deleteCustomer,detailCustomer,detailCustomerAddress,updateCustomer,updateCustomerAddress,addCustomerAddress ,addCustomer} from "../../config/KhachHangApi";


const initialState = {
  customer: [],
  error: null,
  status: "idle",
  pagination: {},

}

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customer = action.payload.listData;
        console.log("state cus", action.payload)
        state.pagination = {
          page: 0,
          pageSize: 5,
          totalItems: action.payload.totalRecord,
        };

      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.colors = state.colors.filter(color => color.index !== action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.colors = [...state.customer, action.payload];
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(detailCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(detailCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the state with the detailed color data
        state.selectedCustomer = action.payload;
      })
      .addCase(detailCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(detailCustomerAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(detailCustomerAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the state with the detailed color data
        state.selectedCustomer = action.payload;
      })
      .addCase(detailCustomerAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const customerIndex = state.customer.findIndex(customer => customer.id === action.payload.id);
        console.log("aaa", action.payload.id)
        if (customerIndex !== -1) {
          state.customer[customerIndex] = action.payload;
        }
      })

      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCustomerAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCustomerAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.colors = [...state.customer, action.payload];
      })
      .addCase(addCustomerAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCustomerAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomerAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.colors = [...state.customer, action.payload];
      })
      .addCase(updateCustomerAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  },
});

export default customerSlice.reducer;
//  export const{setData, setError} = colorSlice.actions;