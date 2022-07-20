import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, getLastCart } from '../../api/index';

export const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    getUser().then(user => {
      if (mounted) {
        sessionStorage.setItem('user', user.id);
        sessionStorage.setItem('loggedIn', true);
      }
      return sessionStorage.getItem('loggedIn');
    })
    .then(loggedIn => {
      if (loggedIn) {
        mounted = false;
        navigate('/products');
      }
    })
  }, []);
  
  return (
    <div>fetching your data.....</div>
  );
}