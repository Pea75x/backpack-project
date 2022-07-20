import axios from 'axios';
const baseUrl = 'https://mybackpackapp.herokuapp.com';

// FABRICS
export const getFabrics = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/fabrics/`
  };
  const { data } = await axios.request(options);
  return data;
};

export const getFabricById = async (id) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/fabric/${id}`
  };
  const { data } = await axios.request(options);
  return data;
};

export const postFabrics = async (fabric) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/fabrics/`,
    data: fabric
  };
  const { data } = await axios.request(options);
  return data;
};

// PRODUCTS
export const getProducts = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/products/`
  };
  const { data } = await axios.request(options);
  return data;
};

export const postProduct = async (product) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/products/`,
    data: product
  };
  const { data } = await axios.request(options);
  return data;
};

export const getProductById = async (id) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/product/${id}`
  };
  const { data } = await axios.request(options);
  return data;
};

export const getProductByPart = async (part) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/productpart/?part=${part}`
  };
  const { data } = await axios.request(options);
  return data;
};

export const getProductByFabric = async (fabric) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/productfabric/?fabric=${fabric}`
  };
  const { data } = await axios.request(options);
  return data;
};
