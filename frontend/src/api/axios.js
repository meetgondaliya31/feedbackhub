import axios from 'axios';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create configured Axios client instance
const API = axios.create({
  baseURL: `${apiBaseURL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Automatically attach JWT Bearer token from localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('feedbackhub_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle global 401 Unauthorized errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('feedbackhub_token');
      localStorage.removeItem('feedbackhub_user');
    }
    return Promise.reject(error);
  }
);

export default API;
