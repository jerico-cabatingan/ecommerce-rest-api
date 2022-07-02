import React from 'react';
import { Filters } from './filters';

// useEffect() will fetch products from the database and save them in state
// Error or loading states will be rendered while waiting for promise to resolve
// .map() the result and display <Product/> for each element with appropriate props for rendering

export const Products = () => {
  return (
    <>
      <div>I am the Products page</div>
      <aside>
        <Filters/>
      </aside>
    </>
  )
}