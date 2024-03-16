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
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (payload) => {
    try {

      const response = await axios.post(
        `${API_URL}/category/get-category-by-condition`,
        payload
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const saveCategory = createAsyncThunk( "category/saveCategory", async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/category/save`, payload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      message.error("Unauthorized: Please log in.");
    }
    throw error;
  }
});
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/category/update`, payload);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Please log in.");
      }
      throw error;
    }
  }
);
