import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8072";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createBill = createAsyncThunk(
  "bill/createBill",
  async ({ idCustomer, idVoucher, totalAmount, note, listDetailProduct }, { getState }) => {
    try {
      const response = await axios.post(
        `${API_URL}/bill/create-bill`,
        {
          idCustomer,
          idVoucher,
          totalAmout: totalAmount, 
          note,
          listDetailProduct,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error creating bill:", error);
      throw error;
    }
  }
);
