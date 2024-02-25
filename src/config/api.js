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
      console.log("siz", response.data)
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

// export const fetchCollars = createAsyncThunk(
//   "collars/fetchCollars",
//   async (payload) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8072/collar/get-collar-by-condition",
//         payload
//       );
//       console.log("siz", response.data)
//       return response.data;
      
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const saveCollar = createAsyncThunk("collars/saveCollar", async (payload) => {
//   try {
//     const response = await axios.post(`${API_URL}/collar/save`, payload);
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       message.error("Unauthorized: Please log in.");
//     }
//     throw error;
//   }
// });

// export const updateCollar = createAsyncThunk(
//   "collars/updateCollar",
//   async (payload) => {
//     try {
//       const response = await axios.post(`${API_URL}/collar/update`, payload);
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         message.error("Unauthorized: Please log in.");
//       }
//       throw error;
//     }
//   }
// );

// export const detailCollar = createAsyncThunk(
//   'collars/detailCollar',
//   async (collarId) => {
//     try {
//       const response = await axios.get(`http://localhost:8072/collar/get-collar-by-id/${collarId}`);
//       return response.data;
//     } catch (error) {
      
//       throw error;
//     }
//   });