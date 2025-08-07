import axios from './axios/axios-instance';

export const registerUser = (userData) => {
  return axios.post('/user/register', userData);
};
