import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { message } from "antd";
import { listProduct } from '../../components/page/Promotion/xxx';

const initialState = {
  detailPromotions: [],
  error: null,
  status: "idle",
  pagination: {},
};

// export const fetchDetailPromotions = createAsyncThunk(
//   "detailPromotions/fetchDetailPromotions", async (payload) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8072/detail-promotion/hien-thi",
//         payload
//       );
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         message.error("Unauthorized: Please log in.");
//       }
//       throw error;
//     }
//   }
// );

export const fetchDetailPromotions = createAsyncThunk(
  "detailPromotions/fetchDetailPromotions", async (payload) => {
    try {
      const response = await axios.post(
        "http://localhost:8072/detail-promotion/hien-thi/condition",
        payload
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Please log in.");
      }
      throw error;
    }
  }
);



export const add = createAsyncThunk(
  "detailPromotions/add", async (payload) => {
    payload.detailProduct = listProduct
    console.log("add, ", payload);
    try {
      const response = await axios.post(
        `http://localhost:8072/detail-promotion/add`, payload);
        listProduct = [];
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Please log in.");
      }
      throw error;
    }
  });

export const detail = createAsyncThunk(
  'detailPromotions/detail', async (payload) => {
    try {

      const response = await axios
        .get(`http://localhost:8072/detail-promotion/hien-thi/${payload}`);
      console.log("Object:" + response.data.data)
      return response.data.data;

    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Please log in.");
      }
      throw error;
    }
  });

export const update = createAsyncThunk(
  "detailPromotions/update", async (payload) => {
    try {

      const response = await axios
        .post(`http://localhost:8072/detail-promotion/update/${payload.id}`
          , payload);
      console.log("Object", response.data)
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Please log in.");
      }
    }
  }
);

export const Delete = createAsyncThunk(
  "detailPromotions/Delete", async (payload) => {
    try {
      const response = await axios
        .post(`http://localhost:8072/promotion/delete/${payload}`);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Please log in.");
      }
    }
  }
);



const detailPromotionSlice = createSlice({
  name: "detailPromotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailPromotions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailPromotions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailPromotions = action.payload.data.listData;
        state.pagination = {
          page: 0,
          pageSize: 5,
          totalItems: action.payload.data.totalRecord,
        };
      })
      .addCase(fetchDetailPromotions.rejected, (state, action) => {
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
      // .addCase(detail.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(detail.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.selectedDetailPromotion = action.payload;
      // })
      // .addCase(detail.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // })
      // .addCase(update.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(update.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      // })
      // .addCase(update.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      // .addCase(Delete.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(Delete.fulfilled, (state) => {
      //   state.status = 'succeeded';
      // })
      // .addCase(Delete.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // });
  },

});


export default detailPromotionSlice.reducer;