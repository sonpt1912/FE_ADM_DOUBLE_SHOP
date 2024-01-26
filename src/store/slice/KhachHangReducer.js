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

      const response = await axios.post(`http://localhost:8072/color/delete/${payload}`);
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
      const response = await axios.post('http://localhost:8072/color/save', payload);
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
      const response = await axios.get(`http://localhost:8072/color/get-one-by-id/${payload}`);
      return response.data;
    } catch (error) {

      throw error;
    }
  });
export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (payload) => {
    try {

      const response = await axios.put(`http://localhost:8072/color/update/${payload.id}`, payload);

      return response.data;

    } catch (error) {

      throw error;
    }
  });
export const getAddress = createAsyncThunk(
  'customer/getAddress',
  async (api) => {
    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/`, api);
      console.log("hi:", response)
      return response.data;
      
    } catch (error) {
      
    }
  }
)


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
        state.colors = [...state.colors, action.payload];
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
      .addCase(getAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.colors = [...state.colors, action.payload];
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default customerSlice.reducer;
//  export const{setData, setError} = colorSlice.actions;