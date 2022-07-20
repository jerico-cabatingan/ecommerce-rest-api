import React, { useState } from 'react';
import { registerNewUser, login } from '../../api/index';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

export const Registration = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerNewUser(fname, lname, email, username, password);

    if (result.detail) {
      setError(result.detail);
    } 
    else if (result && !error) {
      const credentials = await login(result.username, password);

      !credentials ? setError(credentials) :
        setFname('');
        setLname('');
        setUsername('');
        setEmail('');
        setPassword('');
        setError(null);
        sessionStorage.setItem('id', credentials.id);
        sessionStorage.setItem('isLoggedIn', true);
        navigate('/products');
    }
  };


  return (
    <section className='auth'>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label>First Name</label>
          <input type="text" 
            value={fname} 
            onChange={({target}) => setFname(target.value)}
          />
        </div>

        <div className='field'>
          <label>Last Name</label>
          <input type="text" 
            value={lname} 
            onChange={({target}) => setLname(target.value)}
          />
        </div>

        <div className='field'>
          <label>E-mail</label>
          <input type="text" 
            value={email} 
            onChange={({target}) => setEmail(target.value)}
          />
        </div>

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

        <div className='field'>
          <button className='auth' type="submit">Register!</button>
        </div>

        { error && <h5 className='auth'>{error}</h5> }
      </form>

      <div className='field'>
         <h6 className='auth'>or register with</h6>
        <a href='http://localhost:3001/auth/google'>
          <button className='auth'>Google</button>
        </a>
        <a href='http://localhost:3001/auth/facebook'>
          <button className='auth'>Facebook</button>
        </a>
      </div>

      <div className='field'>
        <h6 className='auth'>Already have an account?</h6>
        <Link to='/login'>
          <button className='auth'>
            Log in
          </button>
        </Link>
      </div>
    </section>
  )
};