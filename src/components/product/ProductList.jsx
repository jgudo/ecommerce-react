/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import { MessageDisplay } from 'components/common';
import PropTypes, { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { getProducts } from 'redux/actions/productActions';

const ProductList = (props) => {
	const [isFetching, setFetching] = useState(false);
	const { filteredProducts, productsCount, isLoading } = props;

	const dispatch = useDispatch();
	const fetchProducts = () => {
		setFetching(true);
		dispatch(getProducts(props.lastRefKey));
	};

	useEffect(() => {
		if (productsCount === 0 || !props.lastRefKey) {
			fetchProducts();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
	}, []);

	useEffect(() => {
		setFetching(false);
	}, [props.lastRefKey]);

	const foundOnBasket = id => !!props.basket.find(item => item.id === id);

	if (filteredProducts.length === 0 && !isLoading) {
		return <MessageDisplay message={props.requestStatus?.message || 'No products found.'} />
	} else if (filteredProducts.length === 0 && !isLoading) {
		return (
			<MessageDisplay
				message={props.requestStatus?.message || 'Something went wrong :('}
				action={fetchProducts}
				buttonLabel="Try Again"
			/>
		)
	} else {
		return (
			<>
				{props.children({ foundOnBasket })}

				{/* Show 'Show More' button if products length is less than total products */}
				{props.productsCount < props.totalProductsCount && (
					<div className="d-flex-center padding-l">
						<button
							className="button button-small"
							disabled={isFetching}
							onClick={fetchProducts}
						>
							{isFetching ? 'Fetching Items...' : 'Show More Items'}
						</button>
					</div>
				)}
			</>
		)
	}
};

ProductList.propType = {
	filter: PropTypes.object,
	basket: PropTypes.arrayOf(object),
	filteredProducts: PropTypes.arrayOf(PropTypes.object),
	products: PropTypes.arrayOf(object),
	isLoading: PropTypes.bool.isRequired,
	requestStatus: PropTypes.string.isRequired,
	productsCount: PropTypes.number.isRequired,
	totalProductsCount: PropTypes.number.isRequired,
	filteredProductsLength: PropTypes.number.isRequired,
};

export default ProductList;
