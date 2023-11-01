import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChatLieus = createAsyncThunk(
  "chatLieus/fetchChatLieus",
  async ({ page, pageSize }) => {
    try {
      const response = await fetch(
        `http://localhost:8072/chatLieu/get-chatLieu-by-page?page=${page}&pageSize=${pageSize}`,
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
      const totalChatLieus = data.totalElements || 0;

      return { data, totalChatLieus };
    } catch (error) {
      throw error;
    }
  }
);

export const addChatLieu = createAsyncThunk(
  "chatLieus/addChatLieu",
  async (chatLieuData) => {
    try {
      const response = await fetch("http://localhost:8072/chatLieu/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatLieuData),
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

export const updateChatLieu = createAsyncThunk(
  "chatLieus/updateChatLieu",
  async (chatLieuData) => {
    try {
      const response = await fetch(`http://localhost:8072/chaLieu/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatLieuData),
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

const chatLieuSlice = createSlice({
  name: "chatLieus",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    currentPage: 0,
    pageSize: 5,
    totalPages: 0,
    totalChatLieus: 0,
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
      // getall chat lieu
      .addCase(fetchChatLieus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatLieus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // add color
      .addCase(addChatLieu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addChatLieu.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        state.data.push(action.payload);
      })
      .addCase(addChatLieu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Phân Trang
      .addCase(fetchChatLieus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.totalChatLieus = action.payload.totalChatLieus;
        state.totalPages = Math.ceil(state.totalChatLieus / state.pageSize);
      })

      // update chat lieu
      .addCase(updateChatLieu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateChatLieu.fulfilled, (state, action) => {
        state.status = "succeeded";
        const chatLieuToUpdate = action.payload;
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        const index = state.data.findIndex(
          (chatLieu) => chatLieu.uniqueProperty === chatLieuToUpdate.uniqueProperty
        );
        if (index !== -1) {
          state.data[index] = chatLieuToUpdate;
        }
      })
      .addCase(updateChatLieu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setPageSize } = chatLieuSlice.actions;
export default chatLieuSlice;
