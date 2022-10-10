import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CustomerLoginPopup from './CustomerLoginPopup';
import ExampleBagsPopup from './ExampleBagsPopup';

function Popup({ text, classStyle }) {
  const [onShow, setOnShow] = React.useState(true);
  return (
    <div className={onShow ? `popup ${classStyle}` : 'hidden'}>
      <div className='exit-container'>
        <FaTimes className='exit-icon hover' onClick={() => setOnShow(false)} />
      </div>
      {text === 'login' && <CustomerLoginPopup />}
      {text === 'example' && <ExampleBagsPopup />}
    </div>
  );
}

export default Popup;
