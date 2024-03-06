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
export const fetchCustomer = createAsyncThunk(
  "customer/fetchCustomer",
  async (payload) => {
    try {
      console.log("sss1",payload)
      const response = await axios.post(
        `${API_URL}/customer/get-all`,
        payload
      );
      return response.data;
      
    } catch (error) {
      throw error;
      
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (payload) => {
    try {
      
      const response = await axios.post(`${API_URL}/customer/delete/${payload}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Lỗi khi Xoá ");
      }
      throw error;
    }
  }
);
export const addCustomer = createAsyncThunk(
  'customer/addCustomer',
  async (payload) => {
    try {

      const response = await axios.post(`${API_URL}/customer/save`, payload);
      return response.data;
    } catch (error) {

      if (error.response && error.response.status === 401) {
        message.error("Lỗi khi thêm ");
      }
      throw error;
    }
  },


);
export const addCustomerAddress = createAsyncThunk(
  'customer/addCustomerAddress',
  async (payload) => {
    try {
      
      const response = await axios.post(`${API_URL}/customer/add-address/${payload.id}`,payload);
      return response.data;
    } catch (error) {

      if (error.response && error.response.status === 401) {
        message.error("Lỗi khi thêm địa chỉ khách hàng ");
      }
      throw error;
    }
  },


);
export const updateCustomerAddress = createAsyncThunk(
  'customer/updateCustomerAddress',
  async ({id1,id,payload}) => {
    try {

     
      const response = await axios.post(`${API_URL}/customer/update-address/${id1}/${id}`,payload);

      return response.data;
    } catch (error) {

      if (error.response && error.response.status === 401) {
        message.error("Lỗi khi sủa địa chỉ khách hàng ");
      }
      throw error;
    }
  },


);

export const detailCustomer = createAsyncThunk(
  'customer/detailCustomer',
  async (payload) => {
    try {
      const response = await axios.get(`${API_URL}/customer/get-one-by-id/${payload}`);
      return response.data;
    } catch (error) {

      if (error.response && error.response.status === 401) {
        message.error("Lỗi khi detail ");
      }
      throw error;
    }
  });
export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/customer/update/${payload.id}`, payload);
      return response.data;

    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Lỗi khi sửa ");
      }
      throw error;
    }
  });



export const detailCustomerAddress = createAsyncThunk(
  'customer/detailCustomerAddress',
  async ({ id1, id }) => {
    try {
      const response = await axios.get(`${API_URL}/customer/get-address-by-id/${id1}/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Lỗi khi detail địa chỉ ");
      }
      throw error;
    }
  }
);
