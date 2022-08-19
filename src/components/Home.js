import React from 'react';
import Bag from '../media/baggif.gif';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getLoggedInUserId } from '../api/auth';

function Home() {
  const navigate = useNavigate();
  const [logIn, setLogIn] = React.useState(getLoggedInUserId());
  const location = useLocation();

  React.useEffect(() => {
    setLogIn(getLoggedInUserId());
  }, [location]);

  function logout() {
    sessionStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className='home-container'>
      <div className='column-container'>
        <div className='column1'>
          <div className='behind-bag'></div>
          <img src={Bag} className='bag-gif' alt='bag gif' />
        </div>

        <div className='column2'>
          {!logIn ? (
            <div className='button-container'>
              <Link to='/register' className='button remove-link hover'>
                Register
              </Link>
              <Link to='/login' className='button remove-link hover'>
                Login
              </Link>
            </div>
          ) : (
            <div className='button-container'>
              <div onClick={logout} className='button remove-link hover'>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
