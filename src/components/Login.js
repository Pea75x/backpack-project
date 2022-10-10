import React from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await loginUser(user);

        navigate(`/`);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };
    getData();
  }

  return (
    <div>
      <div className='container'>
        <h1 className='title'>Login</h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='field'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <div className='control'>
              <input
                placeholder='Email'
                name='email'
                type='text'
                className='input'
                id='email'
                value={user.email}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className='field'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <div className='control'>
              <input
                placeholder='Password'
                name='password'
                type='password'
                className='input'
                id='password'
                value={user.password}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <p className='error text'>{errorMessage}</p>
          <button type='submit' className='button hover'>
            Login
          </button>
          <p>
            Dont have an account?
            <a className='black' href='/register'>
              Register now
            </a>
          </p>
        </form>
      </div>

      <Popup text='login' classStyle='login-popup' />
      <Popup text='example' classStyle='example-bag-popup' />
    </div>
  );
}

export default Login;
