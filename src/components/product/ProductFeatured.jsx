import { ImageLoader } from 'components/common';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';

const ProductFeatured = ({ isLoading, product }) => {
    const history = useHistory();
    const onClickItem = () => {
        if (isLoading) return;

        if (product.id) {
            history.push(`/product/${product.id}`);
        }
    };

    return (
        <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
            <div className="product-display" onClick={onClickItem}>
                <div className="product-display-img">
                    {product.image ? (
                        <ImageLoader
                            className="product-card-img"
                            src={product.image}
                        />
                    ) : <Skeleton width={'100%'} height={'100%'} />}
                </div>
                <div className="product-display-details">
                    <h2>{product.name || <Skeleton width={80} />}</h2>
                    <p className="text-subtle text-italic">
                        {product.brand || <Skeleton width={40} />}
                    </p>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default ProductFeatured;
