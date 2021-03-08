import { MessageDisplay } from 'components/common';
import { FeaturedProduct } from 'components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from 'constants/routes';
import { useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop } from 'hooks';
import bannerImg from 'images/banner-girl.png';
import React from 'react';
import { Link } from 'react-router-dom';


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
		<main className="content">
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
								{(featuredProducts.length === 0) ? new Array(4).fill({}).map((product, index) => (
									<FeaturedProduct
										key={`product-skeleton ${index}`}
										product={product}
									/>
								)) : featuredProducts.map(product => (
									<FeaturedProduct
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
									<FeaturedProduct
										key={`product-skeleton ${index}`}
										product={product}
									/>
								)) : recommendedProducts.map(product => (
									<FeaturedProduct
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
		</main>
	);
};

export default Home;
