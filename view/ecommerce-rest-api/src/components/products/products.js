import React, { useState, useEffect } from 'react';
import { Filters } from './filters';
import { Tile } from './tile';
import { Search } from '../Search/search';
import { getProducts } from '../../api/index';
import './products.css';

export const Products = () => {
  const [error, setError] = useState(); 
  const [products, setProducts] = useState([]);
  const [urlQueryString, setUrlQueryString] = useState('');


  useEffect(() => {
    getProducts(urlQueryString).then(result => {
      setProducts(result);
      setError(false);
    })
    .catch(error => {
      setError(error)
    })
  }, [urlQueryString])

  const renderProducts = () => {
    if (error) {
      return <p>{error} <br/>Please refresh the page.</p>
    } 
    else if (!error && products.length === 0) {
      return <p>No results! Please reset your filters</p>
    }
    return (
      <ul>
      { 
        products.map(product => 
          <Tile key={product.id} 
                product={product}
          />
        )
      }
      </ul>
    )
  }

  return (
    <>
      <header className='segments'>
        <Search 
          setUrlQueryString={setUrlQueryString}
          urlQueryString={urlQueryString}
        />
      </header>
      <div className='wrapper'>
        <aside className='segments'>
          <Filters 
            setUrlQueryString={setUrlQueryString}
          />
        </aside>
        <main className='segments'>
          {renderProducts()}
        </main>
      </div>
    </>
  )
}