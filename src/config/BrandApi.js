import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

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
export const fetchBrand = createAsyncThunk(
  "brand/fetchBrand",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/brand/get-brand-by-condition`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);