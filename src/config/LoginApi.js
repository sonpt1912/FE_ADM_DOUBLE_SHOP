import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8072";

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
