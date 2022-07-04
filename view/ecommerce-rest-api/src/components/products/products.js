import React from 'react';
import { Filters } from './filters';
import { getLastCart } from '../../api/index';

// useEffect() will fetch products from the database and save them in state
// Error or loading states will be rendered while waiting for promise to resolve
// .map() the result and display <Product/> for each element with appropriate props for rendering

export const Products = () => {
    
  const handleClick = async () => {
    const result = await getLastCart(sessionStorage.getItem('id'));
    // console.log(result);
    !result ? sessionStorage.setItem('cartId', null) : sessionStorage.setItem('cartId', result)
    // console.log(sessionStorage.getItem('userId'))
  };

  return (
    <>
      <div>I am the Products page</div>
        <button onClick={handleClick}>
          Add Cart to session storage
        </button>
      <aside>
        <Filters/>
      </aside>
    </>
  )
}