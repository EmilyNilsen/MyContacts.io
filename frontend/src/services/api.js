import axios from 'axios';

const PORT = 3002;

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export const requestLogin = async (endpoint, body) => {
  const response = await api.post(endpoint, body);
  return response;
};

export default api;
