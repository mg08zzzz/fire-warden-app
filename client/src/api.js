import axios from 'axios';

const api = axios.create({
  baseURL: '/api/firewardens'
});

export default api;
