// const devUrl = 'http://localhost:8000';
const devUrl = 'https://mybackpackapp.herokuapp.com';
const prodUrl = process.env.REACT_APP_PROD_URL;
export const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
