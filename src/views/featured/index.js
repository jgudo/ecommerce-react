import { MessageDisplay } from 'components/common';
import { FeaturedProduct } from 'components/product';
import { useDocumentTitle, useFeaturedProducts, useScrollTop } from 'hooks';
import bannerImg from 'images/banner-guy.png';
import React from 'react';

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
        <main className="content">
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
                                    <FeaturedProduct
                                        key={`product-skeleton ${index}`}
                                        product={product}
                                    />
                                )) : featuredProducts.map(product => (
                                    <FeaturedProduct
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
        </main>
    );
};

export default FeaturedProducts;
