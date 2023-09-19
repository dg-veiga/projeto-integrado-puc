import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_SERVER}/`,
});

export const endpoints = {
  userAreas: 'user_area/',
  allowAnyRoute: 'allow_any_route/',
  token: 'token/',
  tokenRefresh: 'token/refresh/',
};