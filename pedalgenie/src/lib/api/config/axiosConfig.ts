import axios from 'axios';

const BASE_URL = 'https://your-api-url.com'; // 실제 API URL로 교체하세요

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
