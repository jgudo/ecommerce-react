import React from 'react';
import ProductList from '../product/ProductList';
import ProductAdmin from '../product/ProductAdmin';

const Products = () => {
  return (
    <ProductList>
      {({ products }) => (
        products.map(product => (
          <ProductAdmin 
              key={product.productId}
              product={product}
          />
        ))
      )}
    </ProductList>
  );
};

export default Products;
