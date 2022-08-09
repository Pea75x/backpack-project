import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { isAdmin, getLoggedInUserId } from '../api/auth';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = window.sessionStorage.getItem('token');

  const [isAdminState, setIsAdminState] = React.useState(isAdmin());
  const [userId, setUserId] = React.useState(getLoggedInUserId());
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logout = () => {
    sessionStorage.removeItem('token');
    setMenuOpen(!menuOpen);
    navigate('/');
  };

  console.log(userId);

  React.useEffect(() => {
    setIsAdminState(isAdmin());
    setUserId(getLoggedInUserId());
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
              <Link to={`/myorders/${userId}`} onClick={menuOpen}>
                <li>My orders</li>
              </Link>
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
