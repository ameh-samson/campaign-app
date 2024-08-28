import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
