import axios from "axios";

/*
   This is the central API connector to Spring Boot backend
   Change port ONLY if your backend runs on different port
*/

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8098",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===== REQUEST INTERCEPTOR (OPTIONAL LOGIN TOKEN LATER) ===== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // future JWT
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===== RESPONSE INTERCEPTOR ===== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response);
    return Promise.reject(error);
  }
);

export default api;