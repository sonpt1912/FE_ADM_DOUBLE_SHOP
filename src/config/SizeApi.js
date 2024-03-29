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

export const fetchAllColors = async () => {
  try {
    const response = await axios.get(`${API_URL}/color/get-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSizes = createAsyncThunk(
  "sizes/fetchSizes",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/size/get-size-by-condition`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const saveSize = createAsyncThunk("sizes/saveSize", async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/size/save`, payload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      message.error("Unauthorized: Please log in.");
    }
    throw error;
  }
});

export const updateSize = createAsyncThunk(
  "sizes/updateSize",
  async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/size/update`, payload);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Please log in.");
      }
      throw error;
    }
  }
);
