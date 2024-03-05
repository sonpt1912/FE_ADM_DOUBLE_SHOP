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

export const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/employee/get-all-employee-by-condition`,
        payload
      );
      return response.data.data.listData;
    } catch (error) {
      throw error;
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (employeeData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/employee/create`,
        employeeData
      );
      message.success("Employee created successfully");
      return response.data;
    } catch (error) {
      message.error("Failed to create employee");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employeeData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/employee/update`,
        employeeData
      );
      message.success("Employee updated successfully");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("log error", error);
      message.error("Failed to update employee");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
