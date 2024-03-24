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

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/product/get-all-product`,
        payload
      );
      console.log("sss", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/product/create-product`,
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDetailProduct = createAsyncThunk(
  "product/fetchDetailProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/product/get-detail-product`,
        { idProduct: productId }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
