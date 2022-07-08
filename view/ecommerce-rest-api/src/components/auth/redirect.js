import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, getLastCart } from '../../api/index';

export const Redirect = ({setLoggedIn, setUser, setCart}) => {
  const navigate = useNavigate();

  useEffect(async () => {
    const user = await getUser();
    user ? setUser(user) : setUser(null)
    console.log(user);

    const cart = await getLastCart(user.id);
    cart ? setCart(cart) : setCart(null)
    console.log(cart);

    !cart && !user ? navigate('/login') : 
    navigate('/products')
    setLoggedIn(true);
  }, []);
  
  return (
    <div>Fetching your data....</div>
  );
}