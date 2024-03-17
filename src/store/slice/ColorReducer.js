import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchColors,deleteColor,detailColor,addColor,updateColor } from "../../config/ColorApi";

const initialState = {
  colors: [],
  error: null,
  status: "idle",
  pagination: {},

}



const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(state.colors);
        console.log(action.payload);
        state.colors = action.payload.data.listData;
        console.log(state.colors);
        // initialState.colors = action.payload.listData
        // console.log(initialState);
        state.pagination = {
          page: 0,
          pageSize: 50,
          totalItems: action.payload.totalRecord,
        };

      })

      .addCase(fetchColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteColor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.colors = state.colors.filter(color => color.index !== action.payload);
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addColor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log(state);
        state.colors = [...state.colors, action.payload];
      })
      .addCase(addColor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(detailColor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(detailColor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the state with the detailed color data
        state.selectedColor = action.payload;
      })
      .addCase(detailColor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateColor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const colorIndex = state.colors.findIndex(color => color.id === action.payload.id);
        if (colorIndex !== -1) {
          state.colors[colorIndex] = action.payload;
        }
      })

      .addCase(updateColor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

// export const { setData, setLoading, setError, setTableParams } = colorSlice.actions;
export default colorSlice.reducer;


// const colorSlice = createSlice({
//   name: "colors",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchColors.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchColors.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.colors = action.payload.listData;
//         state.pagination = {
//           page: 0,
//           pageSize: 5,
//           totalItems: action.payload.totalRecord,
//         };

//       })
//       .addCase(fetchColors.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(deleteColor.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(deleteColor.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // state.colors = state.colors.filter(color => color.index !== action.payload);
//       })
//       .addCase(deleteColor.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addColor.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addColor.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // state.colors = [...state.colors, action.payload];
//       })
//       .addCase(addColor.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(detailColor.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(detailColor.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // Update the state with the detailed color data
//         state.selectedColor = action.payload;
//       })
//       .addCase(detailColor.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(updateColor.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateColor.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const colorIndex = state.colors.findIndex(color => color.id === action.payload.id);
//         if (colorIndex !== -1) {
//           state.colors[colorIndex] = action.payload;
//         }
//       })

//       .addCase(updateColor.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//   },
// });

// export default colorSlice.reducer;
// //  export const{setData, setError} = colorSlice.actions;