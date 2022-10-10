import axios from 'axios';
import { baseUrl } from '../config';
// BAGS
export const getBags = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/bags/`
  };
  const { data } = await axios.request(options);
  return data;
};

export const postBag = async (bag) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/createbag/`,
    data: bag,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const getBagById = async (id) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/bag/${id}`
  };
  const { data } = await axios.request(options);
  return data;
};

// ORDERS
export const getOrders = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/populatedorders/`
  };
  const { data } = await axios.request(options);
  return data;
};

export const createOrder = async (order) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/orders/`,
    data: order
  };
  const { data } = await axios.request(options);
  return data;
};

export const getOrderById = async (id) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/order/${id}`
  };
  const { data } = await axios.request(options);
  return data;
};

export const getOrderByUser = async (user) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/userorders?customer_id=${user}`
  };
  const { data } = await axios.request(options);
  return data;
};

// ORDER STATUS
export const postStatus = async (status) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/orderstatus/`,
    data: status
  };
  await axios
    .request(options)
    .then((data) => {
      if (data.status === 201) {
        console.log('data step 1', data);
        return data;
      } else {
        console.log('post status error ', data.details);
      }
    })
    .catch((err) => {
      console.log('post status error ', err);
    });
};
