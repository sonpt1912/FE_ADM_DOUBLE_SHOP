import { createSlice } from '@reduxjs/toolkit';

const ChatLieuSlice = createSlice({
    name: 'chatlieu',
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