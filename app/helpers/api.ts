import axios from 'axios';

export const baseURL = 'http://localhost:3000/api';

export const $api = axios.create({
  withCredentials: true,
  baseURL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const res = await axios.get(`${baseURL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('access_token', res.data.access_token);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('Unauthorization');
      }
    }
    throw error;
  },
);
