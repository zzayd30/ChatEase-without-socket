import axios from "axios";

const backendURL = import.meta.env.VITE_BACKENDURL;

export const axiosInstance = axios.create({
  baseURL: `${backendURL}/api`,
  withCredentials: true,
});
