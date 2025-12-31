import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://tour-guide-api.onrender.com'
    : 'http://127.0.0.1:8000');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export const destinationsAPI = {
  getAll: async () => {
    const response = await api.get('/destinations/');
    return response.data;
  },
  
  create: async (destinationData) => {
    const formData = new FormData();
    formData.append('name', destinationData.name);
    formData.append('description', destinationData.description);
    formData.append('price', destinationData.price);
    formData.append('location', destinationData.location);
    formData.append('rating', destinationData.rating);
    
    if (destinationData.image) {
      formData.append('image', destinationData.image);
    }
    
    const response = await api.post('/destinations/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default api;