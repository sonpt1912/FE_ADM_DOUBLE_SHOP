
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  materials: [],
  error: null,
  status: "idle",
  pagination: {},
};

export const fetchMaterials = createAsyncThunk(
  "materials/fetchMaterials", async (payload) => {
    try {
      const response = await axios.post(
        "http://localhost:8072/Material/hien-thi/condition",
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const add = createAsyncThunk(
  "materials/add", async (payload) => {
    try {
      const response = await axios.post(
        `http://localhost:8072/Material/add`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  export const update = createAsyncThunk(
    "materials/update", async (payload) => {
      try {
        const response = await axios
          .post(`http://localhost:8072/Material/update/${payload}`
            , payload);
  
        return response.data;
      } catch (error) {
        console.error('Error fetching update data:', error);
      }
    }
  );

export const Delete = createAsyncThunk(
  "materials/Delete", async (payload) => {
    try {
      const response = await axios
        .post(`http://localhost:8072/Material/delete/${payload}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  }
);



const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.materials = action.payload.listData;
        state.pagination = {
          page: 0,
          pageSize: 3,
          totalItems: action.payload.totalRecord,
        };
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(add.pending, (state) => {
        state.status = "loading";
      })
      .addCase(add.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(add.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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
      .addCase(Delete.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Delete.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(Delete.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },

});


export default materialSlice.reducer;