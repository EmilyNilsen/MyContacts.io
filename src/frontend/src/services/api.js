import axios from 'axios';

const PORT = 3001;

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export const requestLogin = async (endpoint, body) => {
  const response = await api.post(endpoint, body);
  return response;
};

export const requestData = async (endpoint, headers) => {
  const { data } = await api.get(endpoint, headers);
  return data;
};

export const updateContact = async (endpoint, body, headers) => {
  api.put(endpoint, body, headers);
};

export const deleteContact = async (endpoint, headers) => api.delete(endpoint, headers);

export default api;
