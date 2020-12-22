import React from 'react';

import MessageDisplay from 'components/ui/MessageDisplay';
import ProductFeatured from 'components/product/ProductFeatured';
import useFeaturedProducts from 'hooks/useFeaturedProducts';
import bannerImg from 'images/banner-guy.png';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

const FeaturedProducts = () => {
    useDocumentTitle('Featured Products | Salinaka');
    useScrollTop();

    const {
        featuredProducts,
        fetchFeaturedProducts,
        isLoading,
        error,
    } = useFeaturedProducts();

    return (
        <div className="featured">
            <div className="banner">
                <div className="banner-desc">
                    <h1>Featured Products</h1>
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
                            action={fetchFeaturedProducts}
                            buttonLabel="Try Again"
                        />
                    ) : (
                            <>
                                {featuredProducts.length === 0 ? new Array(4).fill({}).map((product, index) => (
                                    <ProductFeatured
                                        key={`product-skeleton ${index}`}
                                        product={product}
                                    />
                                )) : featuredProducts.map(product => (
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

export default FeaturedProducts;
