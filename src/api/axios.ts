import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Asegúrate de tener esta variable en .env
  timeout: 20000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errData = {
      message:
        error?.response?.data?.detail || error.message || "Error de conexión.",
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(errData);
  }
);

export default api;
