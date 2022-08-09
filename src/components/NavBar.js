import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { isAdmin } from '../api/auth';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = window.sessionStorage.getItem('token');

  const [isAdminState, setIsAdminState] = React.useState(isAdmin());
  const [menuOpen, setMenuOpen] = React.useState(false);
  console.log('success: ', loggedIn);
  console.log('Admin Status: ', isAdminState);

  const logout = () => {
    sessionStorage.removeItem('token');
    setMenuOpen(!menuOpen);
    navigate('/');
  };

  React.useEffect(() => {
    setIsAdminState(isAdmin());
  }, [location]);

  function openMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className='navbar-container'>
      <input
        type='checkbox'
        id='menyAvPaa'
        checked={menuOpen}
        onChange={openMenu}
      />
      <label id='burger' for='menyAvPaa'>
        <div></div>
        <div></div>
        <div></div>
      </label>
      <nav id='meny'>
        {loggedIn ? (
          <ul className='navbar-list'>
            <li>
              <Link to='/' onClick={menuOpen}>
                Home
              </Link>
            </li>
            {!isAdminState ? (
              <li>My orders</li>
            ) : (
              <div>
                <li>
                  <Link to='/stock' onClick={menuOpen}>
                    Stock
                  </Link>
                </li>
                <li>Customer Orders</li>
              </div>
            )}

            <li onClick={logout}>Logout</li>
          </ul>
        ) : (
          <ul className='navbar-list'>
            <Link to='/login' onClick={menuOpen}>
              Login
            </Link>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
