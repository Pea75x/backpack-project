import React from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    username: '',
    address1: '',
    address2: '',
    postcode: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  console.log(user);
  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await registerUser(user);
        navigate(`/login`);
      } catch (error) {
        setErrorMessage(error.response.data);
      }
    };
    getData();
  }

  return (
    <div className='container overflow-container'>
      <h1 className='title'>Register</h1>
      <p className='error text'>{errorMessage}</p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='field'>
          <label className='label'>Username</label>
          <div className='control'>
            <input
              className='input'
              placeholder='Username'
              name='username'
              onChange={handleChange}
              value={user.username}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Email</label>
          <div className='control'>
            <input
              className='input'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={user.email}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Address 1</label>
          <div className='control'>
            <input
              className='input'
              name='address1'
              onChange={handleChange}
              value={user.address1}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Address 2</label>
          <div className='control'>
            <input
              className='input'
              name='address2'
              onChange={handleChange}
              value={user.address2}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Postcode</label>
          <div className='control'>
            <input
              className='input'
              name='postcode'
              onChange={handleChange}
              value={user.postcode}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input
              type='password'
              className='input'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={user.password}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Password Confirmation</label>
          <div className='control'>
            <input
              type='password'
              className='input'
              placeholder='Password Confirmation'
              name='password_confirmation'
              onChange={handleChange}
              value={user.password_confirmation}
            />
          </div>
        </div>

        <button type='submit' className='button login-submit hover'>
          Register Me!
        </button>
        <p className='text'>
          Already have an account?
          <a className='black' href='/login'>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
