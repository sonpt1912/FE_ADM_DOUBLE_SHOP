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
      console.log("sss1",payload)
      const response = await axios.post(
        "http://localhost:8072/customer/get-all",
        payload
      );
      console.log("data",response.data)
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
      console.log("payload3", payload)
      const response = await axios.post(`http://localhost:8072/customer/delete/${payload}`);
      console.log("payloa4", response.data.data)
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
      console.log("payload2", response.data)
      return response.data;
    } catch (error) {

      throw error;
    }
  },


);
export const addCustomerAddress = createAsyncThunk(
  'customer/addCustomerAddress',
  async (payload) => {
    try {
      const response = await axios.post(`http://localhost:8072/customer/add-address/${payload.id}`, payload);
      return response.data;
    } catch (error) {

      throw error;
    }
  },


);
export const updateCustomerAddress = createAsyncThunk(
  'customer/updateCustomerAddress',
  async (payload) => {
    try {

      console.log("sss", payload)
      const response = await axios.post(`http://localhost:8072/address/update/${payload.id}`, payload);
console.log("a", response.data)
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
      const response = await axios.post(`http://localhost:8072/customer/update/${payload.id}`, payload);
      return response.data;

    } catch (error) {

      throw error;
    }
  });



export const detailCustomerAddress = createAsyncThunk(
  'customer/detailCustomerAddress',
  async ({ id1, id }) => {
    try {
      const response = await axios.get(`http://localhost:8072/customer/get-address-by-id/${id1}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

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