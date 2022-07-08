import React, { useState } from 'react';
import { logout } from '../../api/index';
import { useNavigate } from 'react-router-dom';
import './search.css';

// Search bar will render different UI depending on the URL
// Make use of const url = useHref(); 
// Parse specific routes using .includes() to render UI for given route

// search will recieve props to set state in the the top level app component
export const Search = () => {
  const [searchTerm, setSearchterm] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.setItem('id', null);
    sessionStorage.setItem('username', null);
    navigate('/products')
  };

  return (
    <header>
      {/* this div will change using top level state for isLoggedIn */}
      {/* It will redirect to home page and wipe session storage data once pressed */}
      <div className='navigate'>
        {sessionStorage.getItem('id') === null ? 
          <button style={{display: ''}}/> : 
          <button onClick={handleLogout}>Log out</button>}
      </div>
      
      {/* this div will async-request products based on input  and set top level state onSubmit will redirect to products if not already there. else the state refresh should re-render the results anyway*/}
      <div className='navigate'>
        <input 
          className='search-input'
          // value={searchTerm}
          // onChange={handleChange}
          type='text'
          placeholder='Search Products!'
        />
        <button type='submit'>Go</button>
      </div>

      {/* last used cart info will be in session storage and used to render the amount of items and the £ total of the current cart */}
      <div className='navigate'>
        Cart: x
      </div>
    </header>
  )
};