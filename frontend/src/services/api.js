import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const fetchMetrics = async (token, filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await api.get(`/data/metrics?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const seedDemo = async () => {
  const res = await api.post("/data/seed-demo");
  return res.data;
};

export default api;
