import React from 'react';
import { Link } from 'react-router-dom';

const ProductAdmin = ({ product }) => {
  return (
    <div>
      <h4>{product.productName} <span>{product.productPrice}</span></h4>
      <p>{product.productDescription}</p>
      <span>{new Date(product.dateAdded).toString()}</span>
      <Link to={`/edititem/${product.productId}`}>Edit</Link>
    </div>
  );
};

export default ProductAdmin;
