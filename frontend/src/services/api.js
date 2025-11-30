import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (message, history = []) => {
  const response = await api.post('/chat/', {
    message,
    history,
  });
  return response.data;
};

export const resetConversation = async () => {
  const response = await api.post('/reset/');
  return response.data;
};

export default api;