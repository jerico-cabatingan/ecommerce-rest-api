import React from 'react';
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <Link to="/products">Shop Now!</Link>
      <div>
        <Link to="/login">Log in</Link><br/>
        <Link to="/registration">Register</Link>
      </div>
    </div>
  );
}