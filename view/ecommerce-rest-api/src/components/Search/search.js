import React, { useState } from 'react';
import { logout } from '../../api/index';
import { useNavigate } from 'react-router-dom';

// Search bar will render different UI depending on the URL
// Make use of const url = useHref(); 
// Parse specific routes using .includes() to render UI for given route

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
      {sessionStorage.getItem('id') === null ? <button style={{display: 'none'}}/>: <button onClick={handleLogout}>Log out</button>}
      <input 
        className='search-input'
        // value={searchTerm}
        // onChange={handleChange}
        type='text'
        placeholder='Search Products!'
      />
    </header>
  )
};