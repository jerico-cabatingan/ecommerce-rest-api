import React from 'react';
import './product.css';

const imgSrc = [
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-6_large.png?format=webp&v=1530129217',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?format=jpg&quality=90&v=1530129113',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-2_large.png?format=jpg&quality=90&v=1530129132',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-5_large.png?format=jpg&quality=90&v=1530129199',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-4_large.png?format=jpg&quality=90&v=1530129177',
  'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-3_large.png?format=jpg&quality=90&v=1530129152'

];

export const Product = ({product}) => {
  return (
    <div className='tile'>
      <img src={imgSrc[Math.floor(Math.random()* 6)]} alt="Not available" />
      <h2>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h2>
      <h4>Price: {product.price}</h4>
    </div>
  )
}