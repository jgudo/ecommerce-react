import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImg from 'images/banner-girl.png';

import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from 'constants/routes';
import MessageDisplay from 'components/ui/MessageDisplay';
import ProductFeatured from 'components/product/ProductFeatured';
import useFeaturedProducts from 'hooks/useFeaturedProducts';
import useRecommendedProducts from 'hooks/useRecommendedProducts';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

const Home = () => {
	useDocumentTitle('Salinaka | Home');
	useScrollTop();

	const {
		featuredProducts,
		fetchFeaturedProducts,
		isLoading: isLoadingFeatured,
		error: errorFeatured,
	} = useFeaturedProducts(6);
	const {
		recommendedProducts,
		fetchRecommendedProducts,
		isLoading: isLoadingRecommended,
		error: errorRecommended,
	} = useRecommendedProducts(6);

	return (
		<div className="home">
			<div className="banner">
				<div className="banner-desc">
					<h1 className="text-thin"><strong>See</strong> everything with <strong>Clarity</strong></h1>
					<p>Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.</p>
					<br />
					<Link to={SHOP} className="button">
						Shop Now
					</Link>
				</div>
				<div className="banner-img">
					<img src={bannerImg} alt="" />
				</div>
			</div>
			<div className="display">
				<div className="display-header">
					<h1>Featured Products</h1>
					<Link to={FEATURED_PRODUCTS}>See All</Link>
				</div>
				<div className="product-display-grid">
					{(errorFeatured && !isLoadingFeatured) ? (
						<MessageDisplay
							message={errorFeatured}
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
										isLoading={isLoadingFeatured}
										product={product}
									/>
								))}
							</>
						)}
				</div>
			</div>
			<div className="display">
				<div className="display-header">
					<h1>Recommended Products</h1>
					<Link to={RECOMMENDED_PRODUCTS}>See All</Link>
				</div>
				<div className="product-display-grid">
					{(errorRecommended && !isLoadingRecommended) ? (
						<MessageDisplay
							message={errorRecommended}
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
										isLoading={isLoadingRecommended}
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

export default Home;
