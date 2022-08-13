import React from 'react';
import Bag from '../media/bag-gif.gif';

function Home() {
  return (
    <div className='container'>
      <img src={Bag} className='bag-gif' alt='bag gif' />{' '}
      {/* <h1 className='title'>BackPack Factory</h1> */}
    </div>
  );
}

export default Home;
