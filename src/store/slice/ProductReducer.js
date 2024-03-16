import { createSlice } from '@reduxjs/toolkit';
import { fetchProduct } from '../../config/ProductApi';


const initialState = {
    products: [],
    error: null,
    status: "idle",
    pagination: {},
  
  }

  const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProduct.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            console.log(action.payload);
            state.products = action.payload.listData;
          })
          .addCase(fetchProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
    }
  })
  export default productSlice.reducer;
