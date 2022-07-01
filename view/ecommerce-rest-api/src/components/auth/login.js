import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(sessionStorage.getItem('email')) {
      setEmail(sessionStorage.getItem('email'))
    };
    console.log(sessionStorage.getItem('email'))
  }, [])

  useEffect(() => {
    sessionStorage.setItem('email', email)
    console.log(sessionStorage.getItem('email'))
  }, [email])

  const handleSubmit = (e) => {
    e.preventDefault();
    // some asynchronous API request
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label>E-mail</label>
          <input type="text" value={email} onChange={({target}) => setEmail(target.value)}/>
        </div>
        <div className='field'>
          <label>Password</label>
          <input type="text" value={password} onChange={({target}) => setPassword(target.value)}/>
        </div>
        <div className='field'>
          <button type="submit">Log In!</button>
        </div>
      </form>
      <div>
        <h3>Already have an account?</h3>
        <button>
          <Link to='/registration'>Register</Link>
        </button>
      </div>
    </section>
  )
};