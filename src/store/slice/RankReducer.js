import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  rank: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchRanks = createAsyncThunk(
  "rank/fetchRanks",
  async (pageNumber, { getState }) => {
    try {
      const response = await axios.get(
        `http://localhost:8072/rank/page?pageNumber=${pageNumber}`
      );
      const { content, totalPages } = response.data;
      return { content, totalPages };
    } catch (error) {
      throw error;
    }
  }
);

const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRanks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRanks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ranks = action.payload.content;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRanks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectRanks = (state) => state.rank.ranks;
export const selectStatus = (state) => state.rank.status;
export const selectCurrentPage = (state) => state.rank.currentPage;
export const selectTotalPages = (state) => state.rank.totalPages;

export default rankSlice.reducer;
