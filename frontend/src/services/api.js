import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add offline detection
api.interceptors.request.use((config) => {
  if (!navigator.onLine) {
    throw new axios.Cancel("Network offline");
  }
  return config;
});

export default api;
