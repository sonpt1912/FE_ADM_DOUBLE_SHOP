import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async ({ page, pageSize }) => {
    try {
      const response = await fetch(
        `http://localhost:8072/color/get-color-by-page?page=${page}&pageSize=${pageSize}`,
        {
          mode: "cors",
          credentials: "include",
        }
      );
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

export const fetchTotalColors = createAsyncThunk(
  "colors/fetchTotalColors",
  async () => {
    try {
      const response = await fetch("http://localhost:8072/color/get-all", {
        mode: "cors",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.length;
    } catch (error) {
      throw error;
    }
  }
);

export const addColor = createAsyncThunk(
  "colors/addColor",
  async (colorData) => {
    try {
      const response = await fetch("http://localhost:8072/color/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(colorData),
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

export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async (colorData) => {
    try {
      const response = await fetch(`http://localhost:8072/color/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(colorData),
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

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    currentPage: 0,
    pageSize: 5,
    totalPages: 0,
    totalColor: 0,
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
      // getall colors
      .addCase(fetchColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // add color
      .addCase(addColor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        state.data.push(action.payload);
      })
      .addCase(addColor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchTotalColors.fulfilled, (state, action) => {
        state.totalColors = action.payload;
        console.log("Total colors fetched: " + state.totalColors);
      })
      // Phân Trang
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.totalPages = Math.ceil(state.totalColors / state.pageSize);
      })

      // update color
      .addCase(updateColor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.status = "succeeded";
        const colorToUpdate = action.payload;
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        const index = state.data.findIndex(
          (color) => color.uniqueProperty === colorToUpdate.uniqueProperty
        );
        if (index !== -1) {
          state.data[index] = colorToUpdate;
        }
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setCurrentPage, setPageSize } = colorSlice.actions;
export default colorSlice;
