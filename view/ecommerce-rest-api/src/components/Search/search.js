import React, { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import './search.css';

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

  const handleClick = () => {
    navigate('/profile');
  }

  return (
    <>
      <div className='navigate'>
        <div className='profile'
          onClick={handleClick}>
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
    </>
  )
};