import axios from "axios";
import authToken from "@/constants/authToken";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = authToken();
  console.log("Attaching token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Redirecting or clearing session...");
      // Optionally clear token or redirect here
    }
    return Promise.reject(error);
  }
);

export default api;
