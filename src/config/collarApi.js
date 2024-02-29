import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

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
const API_SUCCESS = "success";

  
  export const fetchCollars = createAsyncThunk(
    "collars/fetchCollars",
    async (payload) => {
      try {
        const response = await axios.post(
          "http://localhost:8072/collar/get-collar-by-condition",
          payload
        );
        console.log("siz", response.data)
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
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized: Please log in.");
      }
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
        if (error.response && error.response.status === 401) {
          message.error("Unauthorized: Please log in.");
        }
        throw error;
      }
    }
  );
  
  export const detailCollar = createAsyncThunk(
    'collars/detailCollar',
    async (collarId) => {
      try {
        const response = await axios.get(`http://localhost:8072/collar/get-collar-by-id/${collarId}`);
        return response.data;
      } catch (error) {
        
        throw error;
      }
    });