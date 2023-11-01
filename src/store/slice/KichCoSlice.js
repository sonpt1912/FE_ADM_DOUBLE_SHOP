import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchKichCos = createAsyncThunk(
  "kichCos/fetchKichCos",
  async ({ page, pageSize }) => {
    try {
      const response = await fetch(
        `http://localhost:8072/kichCo/get-kichCo-by-page?page=${page}&pageSize=${pageSize}`,
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
      const totalKichCos = data.totalElements || 0;

      return { data, totalKichCos };
    } catch (error) {
      throw error;
    }
  }
);

export const addKichCo = createAsyncThunk(
  "kichCos/addKichCo",
  async (kichCoData) => {
    try {
      const response = await fetch("http://localhost:8072/kichCo/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kichCoData),
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

export const updateKichCo = createAsyncThunk(
  "kichCos/updateKichCo",
  async (kichCoData) => {
    try {
      const response = await fetch(`http://localhost:8072/kichCo/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kichCoData),
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

const kichCoSlice = createSlice({
  name: "kichCos",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    currentPage: 0,
    pageSize: 5,
    totalPages: 0,
    totalKichCos: 0,
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
      // getall KichCos
      .addCase(fetchKichCos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchKichCos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // add KichCo
      .addCase(addKichCo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addKichCo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        state.data.push(action.payload);
      })
      .addCase(addKichCo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Phân Trang
      .addCase(fetchKichCos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.totalKichCos = action.payload.totalKichCos;
        state.totalPages = Math.ceil(state.totalKichCos / state.pageSize);
      })

      // update KichCo
      .addCase(updateKichCo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateKichCo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const kichCoToUpdate = action.payload;
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        const index = state.data.findIndex(
          (kichCo) => kichCo.uniqueProperty === kichCoToUpdate.uniqueProperty
        );
        if (index !== -1) {
          state.data[index] = kichCoToUpdate;
        }
      })
      .addCase(updateKichCo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setPageSize } = kichCoSlice.actions;
export default kichCoSlice;
