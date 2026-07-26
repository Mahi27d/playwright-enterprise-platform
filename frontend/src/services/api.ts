import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
});

// attach token from localStorage for convenience
export const api = axios.create({ baseURL: "http://localhost:8000" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
