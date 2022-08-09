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

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/create/:id' element={<BagFactory />} />
      <Route path='/stock' element={<StockPage />} />
      <Route path='/fabric/:id' element={<Products />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/order/:id' element={<Order />} />
      <Route path='/myorders/:id' element={<MyOrders />} />
    </Routes>
  </BrowserRouter>
);

export default App;
