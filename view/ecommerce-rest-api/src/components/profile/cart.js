import React, { useState, useEffect } from 'react';
import { getLastCart, getCartItems } from '../../api';
import './profile.css';

export const Cart = ({cart, setCart, total, setTotal}) => {
  const [error, setError] = useState();

  useEffect(() => {
    getLastCart(sessionStorage.getItem('user')).then(result => {
      if (!result) {
        setCart(null);
      }
      else {
        sessionStorage.setItem('active-cart', result.id)
        return getCartItems(result.id);
      }
    })
    .then(items => {
      if (items) {
        let totalCost = 0;
        items.forEach(item => totalCost += parseFloat(item.price.slice(1)))
        setTotal(totalCost.toFixed(2));
        setCart({
            id: sessionStorage.getItem('active-cart'), 
            items: items
        });
      }
      setTotal(0.00)
    })
    .catch(err => {
      setError(err)
      console.log(err);
    });
  }, [])

  const renderCart = () => {
    if (error) {
      return <p>{error} <br/>Please refresh the page.</p>
    } 
    else if (!error && !cart) {
      return <p>No Active Cart</p>
    } 
    else {
      return (
        cart.items.map((item, id) => 
          <li key={id} className='profile'>
            <div>
              <h5>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h5>
              <h5>{item.price}</h5> 
            </div>
          </li>) 
      )
    }
  };

  const showActiveCart = async () => {
    const cartItems = await getCartItems(sessionStorage.getItem('active-cart'))
    setCart({
      id: sessionStorage.getItem('active-cart'), 
      items: cartItems
  });
  }

  const toggleActiveCart = () => {
    if (!cart) {
      return null
    }
    else if (cart && cart.id !== sessionStorage.getItem('active-cart')) {
      return <button id='reset' onClick={showActiveCart}>Show Last Cart</button>
    }
  }

  return (
    <section className='profile'>
      <div>
        {toggleActiveCart()}
        <h1 className='profile'>Active Cart</h1>
      </div>
      <div className='headings'>
        <h3>Item</h3>
        <h3>Price</h3>
      </div>
      <ul>
        {renderCart()}
      </ul>
      <div className='footer'>
        <button className='profile'>Checkout</button>
        <h3>Total: ${total}</h3>
      </div>
    </section>
  )
}