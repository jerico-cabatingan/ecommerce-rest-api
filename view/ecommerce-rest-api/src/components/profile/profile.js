import React from 'react';
import { Cart } from './cart';
import { Orders } from './orders';

// Prompt authentication if user is not logged in 

export const Profile = () => {
  return (
    <>
      <div>I am the Profile page</div>
      <Cart/>
      <Orders/>
    </>
  )
}