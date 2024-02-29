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
export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }) => {
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          username,
          password,
        });
        localStorage.setItem("token", response.data.data.access_token);
        return response.data;
      } catch (error) {
        console.log("error");
        return error.response.data;
      }
    }
  );
  
  export const loginGoogle = createAsyncThunk("auth/google", async (tokenId) => {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, {
        crenditial: tokenId,
      });
      localStorage.setItem("token", response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      throw error.response.data;
    }
  });
  
  export const fetchVouchers = createAsyncThunk(
    "vouchers/fetchVouchers",
    async (payload) => {
      try {
        const response = await axios.post(
          "http://localhost:8072/voucher/get-voucher-by-condition",
          payload
        );
        
        return response.data;
        
      } catch (error) {
        throw error;
      }
    }
  );
  
  export const saveVoucher = createAsyncThunk("vouchers/saveVoucher", async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/voucher/save`, payload);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Lỗi khi thêm ");
      }
      throw error;
    }
  });
  
  export const updateVoucher = createAsyncThunk(
    "vouchers/updateVoucher",
    async (payload) => {
      try {
        const response = await axios.post(`${API_URL}/voucher/update`, payload);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          message.error("Lỗi khi sửa");
        }
        throw error;
      }
    }
  );
  
  export const detailVoucher = createAsyncThunk(
    'vouchers/detailVoucher',
    async (voucherId) => {
      try {
        const response = await axios.get(`http://localhost:8072/voucher/get-voucher-by-id/${voucherId}`);
        return response.data;
      } catch (error) {
        
        throw error;
      }
    });