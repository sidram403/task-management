import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://task-management-vdls.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;