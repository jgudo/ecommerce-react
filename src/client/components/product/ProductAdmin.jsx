import React from 'react';
import { Link } from 'react-router-dom';

const ProductAdmin = ({ product }) => {
  return (
    <div>
      <h4>{product.name} <span>{product.price}</span></h4>
      <p>{product.description}</p>
      <span>{new Date(product.dateAdded).toString()}</span>
      <Link to={`/edititem/${product.id}`}>Edit</Link>
    </div>
  );
};

export default ProductAdmin;
