import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BagFactory from './BagFactory';
import '../App.css';
import StockPage from './StockPage';
import Products from './Products';
import Test from './test';
import Login from './Login';
import Register from './Register';
import Order from './Order';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<BagFactory />} />
      <Route path='/stock' element={<StockPage />} />
      <Route path='/fabric/:id' element={<Products />} />
      <Route path='/test' element={<Test />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/order/:id' element={<Order />} />
    </Routes>
  </BrowserRouter>
);

export default App;
