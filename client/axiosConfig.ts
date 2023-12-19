import axios from 'axios';

export const BASE_URL = 'http://10.0.2.2:8000/api';

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});
