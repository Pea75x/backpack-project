import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BagFactory from './BagFactory';
import '../App.css';
import StockPage from './StockPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<BagFactory />} />
      <Route path='/stock' element={<StockPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
