import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAos = createAsyncThunk(
  "aos/fetchAos",
  async ({ page, pageSize }) => {
    try {
      const response = await fetch(
        `http://localhost:8072/ao/get-ao-by-page?page=${page}&pageSize=${pageSize}`,
        {
          mode: "cors",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Lấy tổng số ao từ data.totalElements
      const totalAos = data.totalElements || 0;

      return { data, totalAos };
    } catch (error) {
      throw error;
    }
  }
);

export const addAo = createAsyncThunk(
  "aos/addAo",
  async (aoData) => {
    try {
      const response = await fetch("http://localhost:8072/ao/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aoData),
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

export const updateAo = createAsyncThunk(
  "aos/updateAo",
  async (aoData) => {
    try {
      const response = await fetch(`http://localhost:8072/ao/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aoData),
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

const aoSlice = createSlice({
  name: "aos",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    currentPage: 0,
    pageSize: 5,
    totalPages: 0,
    totalAos: 0,
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
      // getall aos
      .addCase(fetchAos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // add ao
      .addCase(addAo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAo.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        state.data.push(action.payload);
      })
      .addCase(addAo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Phân Trang
      .addCase(fetchAos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.totalAos = action.payload.totalAos;
        state.totalPages = Math.ceil(state.totalAos / state.pageSize);
      })

      // update ao
      .addCase(updateAo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const aoToUpdate = action.payload;
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        const index = state.data.findIndex(
          (ao) => ao.uniqueProperty === aoToUpdate.uniqueProperty
        );
        if (index !== -1) {
          state.data[index] = aoToUpdate;
        }
      })
      .addCase(updateAo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setPageSize } = aoSlice.actions;
export default aoSlice;
