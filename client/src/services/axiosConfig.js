// axiosConfig.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Asegúrate de que esta URL esté correcta

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: API_URL, // Base URL para todas las solicitudes
});

// Añadir el token a las cabeceras de cada solicitud si está disponible
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
