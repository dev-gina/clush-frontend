import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버 URL
  timeout: 5000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8", 
  },
});

export default axiosInstance;

