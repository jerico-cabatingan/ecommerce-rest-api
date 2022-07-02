import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../api/index';
import { getLastCart } from '../../api/index'

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedlogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(username, password);
    
    if (!result) {
      setFailedlogin(true);
    } else {
      sessionStorage.setItem('id', result.id);
      sessionStorage.setItem('username', result.username);
      setFailedlogin(false);
      console.log(sessionStorage.getItem('id'));
      console.log(sessionStorage.getItem('username'));
    }
  };

  const handleClick = async () => {
    const result = await getLastCart(sessionStorage.getItem('id'));

    console.log(result);

    if (!result) {
      sessionStorage.setItem('cartId', null);
    } else {
      sessionStorage.setItem('cartId', result);
    }

    console.log(sessionStorage.getItem('userId'))
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