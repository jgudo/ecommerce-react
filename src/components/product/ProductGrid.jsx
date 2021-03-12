import { useBasket } from 'hooks';
import React from 'react';
import ProductItem from './ProductItem';

const ProductGrid = ({ products }) => {
    const { basket, addToBasket, isItemOnBasket } = useBasket();

    return (
        <div className="product-grid">
            {products.length === 0 ? new Array(12).fill({}).map((product, index) => (
                <ProductItem
                    key={`product-skeleton ${index}`}
                    product={product}
                />
            )) : products.map(product => (
                <ProductItem
                    key={product.id}
                    isItemOnBasket={isItemOnBasket}
                    addToBasket={addToBasket}
                    product={product}
                />
            ))}
        </div>
    );
}

export default ProductGrid;
