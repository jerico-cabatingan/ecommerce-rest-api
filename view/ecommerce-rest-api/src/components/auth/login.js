import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/index';
import { getLastCart } from '../../api/index'

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
      sessionStorage.setItem('id', result.id);
      sessionStorage.setItem('username', result.username);
      sessionStorage.setItem('isLoggedIn', true);
      navigate('/products')
  };

  const handleClick = async () => {
    const result = await getLastCart(sessionStorage.getItem('id'));
    // console.log(result);
    !result ? sessionStorage.setItem('cartId', null) : sessionStorage.setItem('cartId', result)
    // console.log(sessionStorage.getItem('userId'))
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label>Username</label>
          <input type="text" value={username} onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div className='field'>
          <label>Password</label>
          <input type="text" value={password} onChange={({target}) => setPassword(target.value)}/>
        </div>
        { failedLogin === true && <h5>Incorrect Details</h5>}
        <div className='field'>
          <button type="submit">Log In!</button>
        </div>
      </form>
      <div>
        <ul>
          <li>
            <a href='http://localhost:3001/auth/google'>Log in with google</a>
          </li>
          <li>
            <a href='http://localhost:3001/auth/facebook'>Log in with facebook</a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Don't have an account?</h3>
        <button>
          <Link to='/registration'>Register</Link>
        </button>
        <button onClick={handleClick}>
          Add Cart to session storage
        </button>
      </div>
    </section>
  )
};