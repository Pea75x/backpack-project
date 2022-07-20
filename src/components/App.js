import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BagFactory from './BagFactory';
import '../App.css';
import StockPage from './StockPage';
import Products from './products';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<BagFactory />} />
      <Route path='/stock' element={<StockPage />} />
      <Route path='/fabric/:id' element={<Products />} />
    </Routes>
  </BrowserRouter>
);

export default App;
