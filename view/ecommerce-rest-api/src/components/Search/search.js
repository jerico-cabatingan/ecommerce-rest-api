import React, { useState } from 'react';
import { logout } from '../../api/index';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import './search.css';

// Search bar will render different UI depending on the URL
// Make use of const url = useHref(); 
// Parse specific routes using .includes() to render UI for given route

// search will recieve props to set state in the the top level app component
export const Search = ({ setUrlQueryString }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams(search)
    if (urlSearchParams.has('name')) {
      urlSearchParams.set('name', searchTerm);
    }
    else {
      urlSearchParams.append('name', searchTerm)
    }
    
    let searchParamsObj = {};

    urlSearchParams.forEach((value, key) => {
      searchParamsObj[key] = value;
    })
  
    setSearchParams(searchParamsObj)
    setUrlQueryString(`?${urlSearchParams.toString()}`);
  }

  const handleChange = ({target}) => {
    setSearchTerm(target.value);
  }

  return (
    <>
      {/* this div will async-request products based on input  and set top level state onSubmit will redirect to products if not already there. else the state refresh should re-render the results anyway*/}
      <div className='navigate'>
        <div className='profile'>
        </div>
        <form className='navigate' 
          onSubmit={event => handleSubmit(event)}>
          <input 
            value={searchTerm}
            onChange={handleChange}
            type='text'
            placeholder='Search Products!'
          />
          <input type='submit' value="Go"/>
        </form>
      </div>

      {/* last used cart info will be in session storage and used to render the amount of items and the £ total of the current cart */}
    </>
  )
};