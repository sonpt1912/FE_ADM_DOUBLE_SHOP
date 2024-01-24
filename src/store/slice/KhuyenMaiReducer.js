import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  promotions: [],
  error: null,
  status: "idle",
  pagination: {},
};

export const fetchPromotions = createAsyncThunk(
  "promotions/fetchPromotions", async (payload) => {
    try {
      const response = await axios.post(
        "http://localhost:8072/promotion/hien-thi/condition",
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const add = createAsyncThunk(
  "promotions/add", async (payload) => {
    try {
      const response = await axios.post(
        `http://localhost:8072/promotion/add`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  });

export const detail = createAsyncThunk(
  'promotions/detail', async (payload) => {
    try {
      
      const response = await axios
        .get(`http://localhost:8072/promotion/hien-thi/${payload}`);
        console.log("Object:"+ response.data )
      return response.data;
      
    } catch (error) {

      throw error;
    }
  });

export const update = createAsyncThunk(
  "promotions/update", async (payload) => {
    try {
      
      const response = await axios
        .put(`http://localhost:8072/promotion/update/${payload.id}`
          , payload);
        console.log("Object",response.data)
      return response.data;
    } catch (error) {
    }
  }
);

export const Delete = createAsyncThunk(
  "promotions/Delete", async (payload) => {
    try {
      const response = await axios
        .post(`http://localhost:8072/promotion/delete/${payload}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  }
);



const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.promotions = action.payload.listData;
        state.pagination = {
          page: 0,
          pageSize: 5,
          totalItems: action.payload.totalRecord,
        };
      })
      .addCase(fetchPromotions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(add.pending, (state) => {
        state.status = "loading";
      })
      .addCase(add.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(add.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(detail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(detail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPromotion = action.payload;
      })
      .addCase(detail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(update.pending, (state) => {
        state.status = "loading";
      })
      .addCase(update.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(update.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(Delete.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Delete.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(Delete.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },

});


export default promotionSlice.reducer;