import React, { useState, useEffect } from 'react';
import { getCategories } from '../../api/index';
import { useLocation, useSearchParams } from 'react-router-dom';
import './filters.css'

export const Filters = ({setUrlQueryString}) => {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [filter, setFilter] = useState();
  const [order, setOrder] = useState();
  const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  useEffect(() => {
    getCategories().then(result => {
      let index = 0;
      result.forEach(element => {
        element.id = index;
        index += 1;
      });

      setCategories(result);
    })
  }, [])

  const toggleCategory = ({target}) => {
    const urlSearchParams = new URLSearchParams(search)
    if (urlSearchParams.get('category') === target.value) {
      urlSearchParams.set('category', '')
      setToggle(null);
      console.log(toggle);
    }
    else if (urlSearchParams.has('category')) {
      urlSearchParams.set('category', target.value);
      setToggle(target.id);
      console.log(toggle);
    }
    else {
      urlSearchParams.append('category', target.value);
      setToggle(target.id);
      console.log(toggle);
    }
    
    let searchParamsObj = {};
    urlSearchParams.forEach((value, key) => {
      searchParamsObj[key] = value;
    })
    
    setSearchParams(searchParamsObj)
    setUrlQueryString(`?${urlSearchParams.toString()}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams(search)

    minPrice ? urlSearchParams.set('minPrice', minPrice) : urlSearchParams.delete('minPrice');
    maxPrice ? urlSearchParams.set('maxPrice', maxPrice) : urlSearchParams.delete('maxPrice');
    
    let searchParamsObj = {};
    urlSearchParams.forEach((value, key) => {
      searchParamsObj[key] = value;
    })
    
    setSearchParams(searchParamsObj)
    setUrlQueryString(`?${urlSearchParams.toString()}`);

  }

  const reorderProducts = (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams(search);

    filter ? urlSearchParams.set('sort', filter) : urlSearchParams.delete('sort');
    order ? urlSearchParams.set('order', order) : urlSearchParams.delete('order');
    
    let searchParamsObj = {};
    urlSearchParams.forEach((value, key) => {
      searchParamsObj[key] = value;
    })
    
    setSearchParams(searchParamsObj)
    setUrlQueryString(`?${urlSearchParams.toString()}`);
  }


  return (
    <>
      <div>
        <h4 className='filter'>Price</h4>
        <form className='filter'
         onSubmit={handleSubmit}> 
          <input 
            onChange={({target}) => {setMinPrice(target.value)}}
            value={minPrice}
            type='number'
            placeholder='Minimum Price'
          />

          <input 
            onChange={({target}) => {setMaxPrice(target.value)}}
            value={maxPrice}
            type='number'
            placeholder='Maximum Price'
          />
          <input id='submit' type='submit' value='Go'/>
        </form>
      </div>
      
      <div>
        <h4 className='filter'>Refine</h4>
        <form className='filter'
          onSubmit={reorderProducts}>
          <select onChange={({target}) => {setFilter(target.value)}}>
            <option disabled selected>Select a filter</option>
            <option value=''>None</option>
            <option value='price'>Price</option>
            <option value='name'>Alphabet</option>
          </select>

          <select onChange={({target}) => {setOrder(target.value)}}>
            <option disabled selected>Order by</option>
            <option value=''>None</option>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
          <input type='submit' value='Go'/>
        </form>
      </div>

      <div>
        <h4 className='filter'>Categories</h4>
        <ul className='filter'>
          { categories.map(category => 
              <li key={category.id}>
                <button 
                  id={category.id}
                  className ={category.id == toggle ? 'active' : 'filter'}
                  value={category.category}
                  onClick={toggleCategory}
                >
                  {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                </button>
              </li>
            )
          }
        </ul>
      </div>
    </>
  )
}