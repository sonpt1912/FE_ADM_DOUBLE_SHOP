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

  export const saveAllVoucher = createAsyncThunk("vouchers/saveAllVoucher", async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/voucher/save-all`, payload);
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