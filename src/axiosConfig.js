import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Base URL of your server
  withCredentials: true, // This allows cookies to be sent with requests
});

export default axiosInstance;
