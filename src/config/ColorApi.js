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
export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/color/get-all`,
        payload
      );
      console.log("sss", response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteColor = createAsyncThunk(
  'colors/deleteColor',
  async (colorId) => {
    try {
      const response = await axios.post(`${API_URL}/color/delete/${colorId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addColor = createAsyncThunk(
  'colors/addColor',
  async (colorData) => {
    try {
      const response = await axios.post(`${API_URL}/color/save`, colorData);
      return response.data;
    } catch (error) {

      throw error;
    }
  },


);
export const detailColor = createAsyncThunk(
  'colors/detailColor',
  async (colorId) => {
    try {
      const response = await axios.get(`${API_URL}/color/get-one-by-id/${colorId}`);
      return response.data.data;
    } catch (error) {

      throw error;
    }
  });
export const updateColor = createAsyncThunk(
  'colors/updateColor',
  async (colorId1) => {
    try {


      const response = await axios.post(`${API_URL}/color/update/${colorId1.id}`, colorId1);
      return response.data;

    } catch (error) {

      throw error;
    }
  });
