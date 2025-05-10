// services.js (API service)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getServices = () => api.get('/services');
export const addService = (service) => api.post('/services', service);
export const deleteService = (id) => api.delete(`/services/${id}`);
