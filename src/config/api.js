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

const API_SUCCESS = "success";
