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
    <div className='background'>
      <div className='square'>
        <div className='top-heading'>
          <h1 className='my-title'>Register</h1>
        </div>
        <p>{errorMessage}</p>
        <form className='reg-form' onSubmit={handleSubmit}>
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

          <label className='label'>Address 1</label>
          <div className='control'>
            <input
              className='input'
              name='address1'
              onChange={handleChange}
              value={user.address1}
            />
          </div>

          <label className='label'>Address 2</label>
          <div className='control'>
            <input
              className='input'
              name='address2'
              onChange={handleChange}
              value={user.address2}
            />
          </div>
          <label className='label'>Postcode</label>
          <div className='control'>
            <input
              className='input'
              name='postcode'
              onChange={handleChange}
              value={user.postcode}
            />
          </div>

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

          <div className='field'>
            <button type='submit' className='button-style register'>
              Register Me!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
