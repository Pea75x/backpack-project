import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BagFactory from './BagFactory';
import '../App.css';
import StockPage from './StockPage';
import Products from './products';
import Test from './test';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<BagFactory />} />
      <Route path='/stock' element={<StockPage />} />
      <Route path='/fabric/:id' element={<Products />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  </BrowserRouter>
);

export default App;
