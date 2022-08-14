import React from 'react';
import Bag from '../media/baggif.gif';
import { Link } from 'react-router-dom';

function Home() {
  const loggedIn = window.sessionStorage.getItem('token');

  return (
    <div className='flex-center'>
      <div className='homebag-container flex-center'>
        <h1 className='header-title'>Bag Factory</h1>
        <img src={Bag} className='bag-gif' alt='bag gif' />
      </div>
      {!loggedIn && (
        <div className='flower-button flex-center'>
          <Link to='/login' className='remove-link hover'>
            <p className='title'>Login</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
