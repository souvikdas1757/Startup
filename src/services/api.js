import axios from 'axios';

// In production (Vercel), use relative path "/api" so it hits the same domain.
// In local development, use the local backend URL.
const baseURL = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;