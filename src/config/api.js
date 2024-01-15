import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8072";

export const fetchAllColors = async () => {
  try {
    const response = await axios.get(`${API_URL}/color/get-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const API_SUCCESS = "success";

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
      throw error;
    }
  }
);

export const fetchCollars = createAsyncThunk(
  "collars/fetchCollars",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/collar/get-collar-by-condition`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const saveCollar = createAsyncThunk("collars/saveCollar", async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/collar/save`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateCollar = createAsyncThunk(
  "collars/updateCollar",
  async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/collar/update`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);



