import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart } from './cart';
import { Orders } from './orders';
import { logout } from '../../api/index';

// Prompt authentication if user is not logged in 

export const Profile = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0.00);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('loggedIn')) {
      navigate('/login')
    }
  }, [])

  const logOut = () => {
    sessionStorage.clear();
    logout();
    navigate('/');
  }


  return (
    <>
      <header className='profile'>
        <button 
          className='profile'
          onClick={() => navigate('/products')}>Home</button>
        <button  
          className='profile'
          onClick={logOut}>Log Out</button>
      </header>
      <main>
        <Cart 
          cart={cart} 
          setCart={setCart}
          total={total}
          setTotal={setTotal}/>
        <Orders 
          cart={cart}
          setCart={setCart}
          setTotal={setTotal}/>
      </main>
    </>
  )
}