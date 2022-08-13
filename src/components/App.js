import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BagFactory from './BagFactory';
import '../App.css';
import StockPage from './StockPage';
import Products from './Products';
import Login from './Login';
import Register from './Register';
import Order from './Order';
import NavBar from './NavBar';
import MyOrders from './MyOrders';
import CustomerOrders from './CustomerOrders';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create/:id' element={<BagFactory />} />
      <Route path='/stock' element={<StockPage />} />
      <Route path='/fabric/:id' element={<Products />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/order/:id' element={<Order />} />
      <Route path='/myorders/:id' element={<MyOrders />} />
      <Route path='/customer-orders' element={<CustomerOrders />} />
    </Routes>
  </BrowserRouter>
);

export default App;
