import axios from "axios";
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';


const initialState ={
    colors: [],
    error: null,
    status: "idle",
    pagination: {},

}
export const fetchColors = createAsyncThunk(
    "colors/fetchColors",
    async (payload) => {
      try {
        const response = await axios.post(
          "http://localhost:8072/color/get-all",
          payload
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );
  export const deleteColor = createAsyncThunk(
    'colors/deleteColor',
    async (colorId) => {
      try {
        const response = await axios.post(`http://localhost:8072/color/delete/${colorId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );
  export const addColor = createAsyncThunk(
    'colors/addColor',
    async (colorData) => {
      try {
        const response = await axios.post('http://localhost:8072/color/save', colorData);
        return response.data;
      } catch (error) {
        
        throw error;
      }
    },
   

    );
    export const detailColor = createAsyncThunk(
        'colors/detailColor',
        async (colorId) => {
          try {
            const response = await axios.get(`http://localhost:8072/color/get-one-by-id/${colorId}`);
            return response.data;
          } catch (error) {
            
            throw error;
          }
        });
        export const updateColor = createAsyncThunk(
          'colors/updateColor',
          async (colorId1) => {
            try {
              
              const response = await axios.put(`http://localhost:8072/color/update/${colorId1.id}`, colorId1);
              
              return response.data;
              
            } catch (error) {
              
              throw error;
            }
          });
          
  
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
          state.colors = action.payload.listData;
          state.pagination = {
            page: 0,
            pageSize: 5,
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

 export default colorSlice.reducer;
//  export const{setData, setError} = colorSlice.actions;