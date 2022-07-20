import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/index';
import './auth.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedlogin] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(username, password);
    
    !result ? setFailedlogin(true) :  
      setFailedlogin(false)
      sessionStorage.setItem('user', result.id);
      sessionStorage.setItem('loggedIn', true);
      navigate('/products')
  };

  return (
    <section className='auth'>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label>Username</label>
          <input type="text" 
            value={username} 
            onChange={({target}) => setUsername(target.value)}
          />
        </div>

        <div className='field'>
          <label>Password</label>
          <input type="text" 
            value={password} 
            onChange={({target}) => setPassword(target.value)}
          />
        </div>

        { failedLogin === true && <h5 className='auth'>Incorrect Details</h5>}

        <div className='field'>
          <button className='auth' type="submit">Log In!</button>
        </div>
      </form>

      <div className='field'>
        <h6 className='auth'>or log in with</h6>
        <a href='http://localhost:3001/auth/google'>
          <button className='auth'>Google</button>
        </a>
        
        <a href='http://localhost:3001/auth/facebook'>
          <button className='auth'>Facebook</button>
        </a>
      </div>

      <div className='field'>
        <h6>Don't have an account?</h6>
        <Link to='/registration'>
          <button className='auth'>
            Register
          </button>
        </Link>
      </div>
    </section>
  )
};