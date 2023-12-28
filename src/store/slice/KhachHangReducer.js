import { createSlice } from '@reduxjs/toolkit';

const khachHangSlice = createSlice({
  name: 'khachHang',
  initialState: {
    data: [],
    loading: false,
    error: null,
    tableParams: {
      pagination: {
        current: 1,
        pageSize: 5,
      },
    },
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTableParams: (state, action) => {
      state.tableParams = action.payload;
    },
  },
});

export const { setData, setLoading, setError, setTableParams } = khachHangSlice.actions;
export default khachHangSlice.reducer;
