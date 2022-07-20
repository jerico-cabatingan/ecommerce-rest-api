import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export const Home = () => {
  return (
    <div className='container'>
      <div className='title'>
        Welcome to my shop!
      </div>
      <div className='top'>
        <Link to="/products">
          <button className='home' id='shop-now'>Shop Now!</button>
        </Link>
      </div>
      <div className='bottom'>
        <Link to="/login">
          <button className='home-auth'>Log in</button>
        </Link>
        <Link to="/registration">
          <button className='home-auth'>Register</button>
        </Link>
      </div>
    </div>
  );
}