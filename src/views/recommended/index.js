import React from 'react';

import MessageDisplay from 'components/ui/MessageDisplay';
import ProductFeatured from 'components/product/ProductFeatured';
import bannerImg from 'images/banner-girl-1.png';
import useRecommendedProducts from 'hooks/useRecommendedProducts';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

const RecommendedProducts = () => {
    useDocumentTitle('Recommended Products | Salinaka');
    useScrollTop();

    const {
        recommendedProducts,
        fetchRecommendedProducts,
        isLoading,
        error,
    } = useRecommendedProducts();

    return (
        <div className="featured">
            <div className="banner">
                <div className="banner-desc">
                    <h1>Recommended Products</h1>
                </div>
                <div className="banner-img">
                    <img src={bannerImg} alt="" />
                </div>
            </div>
            <div className="display">
                <div className="product-display-grid">
                    {(error && !isLoading) ? (
                        <MessageDisplay
                            message={error}
                            action={fetchRecommendedProducts}
                            buttonLabel="Try Again"
                        />
                    ) : (
                            <>
                                {recommendedProducts.length === 0 ? new Array(4).fill({}).map((product, index) => (
                                    <ProductFeatured
                                        key={`product-skeleton ${index}`}
                                        product={product}
                                    />
                                )) : recommendedProducts.map(product => (
                                    <ProductFeatured
                                        key={product.id}
                                        isLoading={isLoading}
                                        product={product}
                                    />
                                ))}
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default RecommendedProducts;
