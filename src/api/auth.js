import axios from 'axios';
import { baseUrl } from '../config';

export const registerUser = async (user) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/register/`,
    data: user
  };
  const { data } = await axios.request(options);

  return data;
};

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/login/`,
    data: credentials
  };

  const { data } = await axios.request(options);
  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    window.sessionStorage.removeItem('token');
  }
  console.log('login data', data);
  return data;
};
export function isAdmin() {
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return !!userObject.admin;
}

export function getLoggedInUserId() {
  const token = sessionStorage.getItem('token');
  if (!token) return false; //safety in case there's no token

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return userObject.sub;
}
