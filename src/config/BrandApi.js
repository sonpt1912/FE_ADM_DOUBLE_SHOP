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
export const saveBrand = createAsyncThunk( "brand/saveBrand", async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/brand/save`, payload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      message.error("Unauthorized: Please log in.");
    }
    throw error;
  }
});
export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/brand/update`, payload);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Please log in.");
      }
      throw error;
    }
  }
);