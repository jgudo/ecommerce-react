import React from 'react';
import { ProductItem } from '../components';

const ProductsTable = ({ filteredProducts }) => {
    return (
        <div>
            {filteredProducts.length > 0 && (
                <div className="grid grid-product grid-count-6">
                    <div className="grid-col" />
                    <div className="grid-col">
                        <h5>Name</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Brand</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Price</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Date Added</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Qty</h5>
                    </div>
                </div>
            )}
            {filteredProducts.length === 0 ? new Array(10).fill({}).map((product, index) => (
                <ProductItem
                    key={`product-skeleton ${index}`}
                    product={product}
                />
            )) : filteredProducts.map(product => (
                <ProductItem
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
};

export default ProductsTable;
