import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  customer: [],
  error: null,
  status: "idle",
  pagination: {},

}
export const fetchCustomer = createAsyncThunk(
  "customer/fetchCustomer",
  async (payload) => {
    try {
      const response = await axios.post(
        "http://localhost:8072/customer/get-all",
        payload
      );
      console.log("kh", response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (payload) => {
    try {

      const response = await axios.post(`http://localhost:8072/customer/delete/${payload}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addCustomer = createAsyncThunk(
  'customer/addCustomer',
  async (payload) => {
    try {
      const response = await axios.post('http://localhost:8072/customer/save', payload);
      return response.data;
    } catch (error) {

      throw error;
    }
  },


);
export const detailCustomer = createAsyncThunk(
  'customer/detailCustomer',
  async (payload) => {
    try {
      const response = await axios.get(`http://localhost:8072/customer/get-one-by-id/${payload}`);
      return response.data;
    } catch (error) {

      throw error;
    }
  });
export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (payload) => {
    try {

      const response = await axios.put(`http://localhost:8072/customer/update/${payload.id}`, payload);

      return response.data;

    } catch (error) {

      throw error;
    }
  });



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
        state.customer = action.payload.data.listData;
        console.log("action", action.payload)
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
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const customerIndex = state.customer.findIndex(customer => customer.id === action.payload.id);
        if (customerIndex !== -1) {
          state.customer[customerIndex] = action.payload;
        }
      })

      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
     
  },
});

export default customerSlice.reducer;
//  export const{setData, setError} = colorSlice.actions;