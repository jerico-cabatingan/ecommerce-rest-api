import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getProduct } from '../../api/index';

const imgSrc = [
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-6_large.png?format=webp&v=1530129217',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?format=jpg&quality=90&v=1530129113',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-2_large.png?format=jpg&quality=90&v=1530129132',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-5_large.png?format=jpg&quality=90&v=1530129199',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-4_large.png?format=jpg&quality=90&v=1530129177',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-3_large.png?format=jpg&quality=90&v=1530129152'

];

export const Item = () => {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    getProduct(productId).then(result => {
      if (result) {
        console.log(result);
        setItem(result);
      } 
      else {
        setItem(null);
      }
    })
    .catch(error => {
      console.log(error);
      setError(error);
    })
  }, [])

  const renderError = () => {
    return (
      <>
        <p>Sorry we could not fetch the product information</p>
        <br/>
        <br/>
      </>
    )
  }

  const renderItem = () => {
    return (
      <div className='item'>
        <img src='#'/>
        <h1>{item.name}</h1>
        <h3>{item.category}</h3>
        <h3>{item.price}</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    )
  };

  return (
    <>
      <header className='item'>
      </header>
      <main className='item'>
        {!item || error ? renderError() : renderItem()}
      </main>
    </>
  )
}