import axios from "axios";

const API_URL = "http://localhost:8072";

export const fetchAllColors = async () => {
  try {
    const response = await axios.get(`${API_URL}/color/get-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllAos = async () => {
  try {
    const response = await axios.get(`${API_URL}/ao/get-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllSizes = async () => {
  try {
    const response = await axios.get(`${API_URL}/kichCo/get-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllChatLieus = async () => {
  try {
    const response = await axios.get(`${API_URL}/chatLieu/get-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllCoAos = async () => {
  try {
    const response = await axios.get(`${API_URL}/coAo/get-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
