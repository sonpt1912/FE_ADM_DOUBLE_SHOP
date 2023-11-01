import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoAos = createAsyncThunk(
  "coAos/fetchCoAos",
  async ({ page, pageSize }) => {
    try {
      const response = await fetch(
        `http://localhost:8072/coAo/get-coAo-by-page?page=${page}&pageSize=${pageSize}`,
        {
          mode: "cors",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Lấy tổng số màu từ data.totalElements
      const totalCoAos = data.totalElements || 0;

      return { data, totalCoAos };
    } catch (error) {
      throw error;
    }
  }
);

export const addCoAo = createAsyncThunk(
  "coAos/addCoAo",
  async (coAoData) => {
    try {
      const response = await fetch("http://localhost:8072/coAo/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coAoData),
        mode: "cors",
        credentials: "include",
      });

      if (!response.ok) {
        throw Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCoAo = createAsyncThunk(
  "coAos/updateCoAo",
  async (coAoData) => {
    try {
      const response = await fetch(`http://localhost:8072/coAo/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coAoData),
        mode: "cors",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const coAoSlice = createSlice({
  name: "coAos",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    currentPage: 0,
    pageSize: 5,
    totalPages: 0,
    totalCoAos: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // getall coAos
      .addCase(fetchCoAos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoAos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // add color
      .addCase(addCoAo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCoAo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        state.data.push(action.payload);
      })
      .addCase(addCoAo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Phân Trang
      .addCase(fetchCoAos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.totalCoAos = action.payload.totalCoAos;
        state.totalPages = Math.ceil(state.totalCoAos / state.pageSize);
      })

      // update co ao
      .addCase(updateCoAo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCoAo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const coAoToUpdate = action.payload;
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        const index = state.data.findIndex(
          (coAo) => coAo.uniqueProperty === coAoToUpdate.uniqueProperty
        );
        if (index !== -1) {
          state.data[index] = coAoToUpdate;
        }
      })
      .addCase(updateCoAo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setPageSize } = coAoSlice.actions;
export default coAoSlice;
