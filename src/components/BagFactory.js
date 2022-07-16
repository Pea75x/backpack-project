import React from 'react';
import bag from '../media/bag-body.svg';

function BagFactory() {
  return (
    <div className='App'>
      <p>Hey girl how you doing</p>
      <div className='box'>
        <div className='bag-images'>
          {/* <img src='' alt='lining' className='bag-part' />
          <img src='' alt='heart' className='bag-part' />
          <img src='' alt='bottom' className='bag-part' />
          <img src='' alt='front' className='bag-part' />
          <img src='' alt='pocket' className='bag-part' />
          <img src='' alt='strap' className='bag-part' />
          <img src='' alt='top' className='bag-part' />
          <img src='' alt='zip' className='bag-part' />
          <img src='' alt='zip' className='bag-part' /> */}
          {/* <img src='' alt='zip' className='bag-part' /> */}
          <img src={bag} alt='bag' className='bag-part' />
        </div>
      </div>
    </div>
  );
}

export default BagFactory;
