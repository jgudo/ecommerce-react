import React from 'react';
import ProductList from '../product/ProductList';
import ProductClient from '../product/ProductClient';
import Basket from '../basket/basket';

const Home = () => {
  return (
    <section className="product-list-wrapper">
      <h1>Products</h1>
      <ProductList>
        {({ products, addToBasket }) => (
          <div className="product-list">
            {products.map(product => (
              <ProductClient 
                  addToBasket={addToBasket} 
                  key={product.productId}
                  product={product}
              />
            ))}
          </div>
        )}
      </ProductList>
      <Basket />
    </section>
  );
};

export default Home;
