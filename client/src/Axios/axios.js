import axios from 'axios';

export const axiosHomeInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
});
export const axiosClientInstance = axios.create({
  baseURL: 'http://localhost:3001/api/user',
});
