import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Registration = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    // some asynchronous API request
    console.log(sessionStorage.getItem('email'))
  };


  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label>First Name</label>
          <input type="text" value={fname} onChange={({target}) => setFname(target.value)}/>
        </div>
        <div className='field'>
          <label>Last Name</label>
          <input type="text" value={lname} onChange={({target}) => setLname(target.value)}/>
        </div>
        <div className='field'>
          <label>E-mail</label>
          <input type="text" value={email} onChange={({target}) => setEmail(target.value)}/>
        </div>
        <div className='field'>
          <label>Password</label>
          <input type="text" value={password} onChange={({target}) => setPassword(target.value)}/>
        </div>
        <div className='field'>
          <button type="submit">Register!</button>
        </div>
      </form>
      <div>
        <h3>Already have an account?</h3>
        <button>
          <Link to='/login'>Log-In</Link>
        </button>
      </div>
    </section>
  )
};