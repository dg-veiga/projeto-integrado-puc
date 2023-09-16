import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_SERVER}/data/`,
});

export const endpoints = {
  userAreas: 'user_area/',
};

export default api;
