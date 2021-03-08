import { MessageDisplay } from 'components/common';
import { FeaturedProduct } from 'components/product';
import { useDocumentTitle, useRecommendedProducts, useScrollTop } from 'hooks';
import bannerImg from 'images/banner-girl-1.png';
import React from 'react';


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
        <main className="content">
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
                                    <FeaturedProduct
                                        key={`product-skeleton ${index}`}
                                        product={product}
                                    />
                                )) : recommendedProducts.map(product => (
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

export default RecommendedProducts;
