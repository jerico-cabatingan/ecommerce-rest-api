import React, { useState, useEffect } from 'react';
import { getOrders, getCartItems } from '../../api';
import './profile.css';

export const Orders = ({cart, setCart, setTotal}) => {
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    getOrders(sessionStorage.getItem('user')).then(results => {
      setOrders(results);
    })
    .catch(err => {
      setError(err);
    })
  }, [])

  const handleClick = async (cartId) => {
    const items = await getCartItems(cartId);
    let totalCost = 0;

    items.forEach(item => totalCost += parseFloat(item.price.slice(1)))

    setTotal(totalCost.toFixed(2));
    setCart({
      id: cartId, 
      items: items
    });
  };

  const renderOrders = () => {
    if (error) {
      return <p>{error} <br/>Please refresh the page.</p>
    } 
    else if (!error && orders.length === 0) {
      return <p>No order history</p>
    }
    return (
      orders.map((order, id) => 
        <li key={id} className='profile'>
          <div className={() => {
            if (order.cart_id === cart.id ){
              return 'selected'
            }
            return ''
          }}>
            <h5>Delivered</h5>
            <h5>{order.date.substring(0,10)}</h5> 
            <h5>{order.total_price}</h5>
            <button className='profile' onClick={() => {handleClick(order.cart_id)}}>
              View Order
            </button>
          </div>
        </li>) 
    )
  };

  return (
    <section className='profile'>
      <h1 className='profile'>Order History</h1>
      <div className='headings'>
        <h3>Status</h3>
        <h3>Date Ordered</h3>
        <h3>Total</h3>
        <h3 id='filler'></h3>
      </div>
      <ul>{renderOrders()}</ul>
    </section>
  )
};