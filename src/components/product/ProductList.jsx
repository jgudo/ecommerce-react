/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'selectors/selector';

import { getProducts } from 'redux/actions/productActions';
import dispatchIsLoading from 'redux/actions/appActions';
import MessageDisplay from '../ui/MessageDisplay';

const ProductList = ({ children }) => {
	const [isFetching, setFetching] = useState(false);
	const { store } = useSelector(state => ({
		store: {
			productsLength: state.products.items.length,
			products: state.products.items,
			lastRefKey: state.products.lastRefKey,
			totalItems: state.products.total,
			isLoading: state.app.loading,
			filteredProducts: selectFilter(state.products.items, state.filter),
			requestStatus: state.app.requestStatus
		}
	}));
	const dispatch = useDispatch();
	const fetchProducts = () => {
		setFetching(true);
		dispatch(getProducts(store.lastRefKey));
	};

	useEffect(() => {
		if (store.productsLength === 0) {
			fetchProducts();
		}

		window.scrollTo(0, 0);
		return () => dispatch(dispatchIsLoading(false));
	}, []);

	useEffect(() => {
		setFetching(false);
	}, [store.lastRefKey]);

	return store.filteredProducts.length === 0 && !store.isLoading && !store.requestStatus ? (
		<MessageDisplay
			message="The are no items found."
			desc="Try using correct filters or keyword."
		/>
	) : store.requestStatus ? (
		<MessageDisplay
			message={store.requestStatus}
			action={fetchProducts}
			buttonLabel="Try Again"
		/>
	) : (
				<>
					{children({ ...store })}
					{store.productsLength < store.totalItems && (
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
			);
};

ProductList.propType = {
	isLoading: PropTypes.bool.isRequired,
	requestStatus: PropTypes.string.isRequired,
	productsLength: PropTypes.number.isRequired,
	filteredProductsLength: PropTypes.number.isRequired,
	dispatch: PropTypes.func.isRequired
};

export default ProductList;
