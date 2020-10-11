/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'selectors/selector';

import { RootState } from 'types/types';
import { getProducts } from 'redux/actions/productActions';
import { setLoading } from 'redux/actions/miscActions';
import MessageDisplay from '../ui/MessageDisplay';

interface IProps {
	children: (obj: any) => JSX.Element;
}

const ProductList: React.FC<IProps> = ({ children }) => {
	const [isFetching, setFetching] = useState(false);
	const store = useSelector((state: RootState) => ({
		productsLength: state.products.items.length,
		products: state.products.items,
		lastRefKey: state.products.lastRefKey,
		totalItems: state.products.total,
		isLoading: state.app.loading,
		filteredProducts: selectFilter(state.products.items, state.filter),
		requestStatus: state.app.requestStatus
	}));
	const dispatch = useDispatch();
	const fetchProducts = (): void => {
		setFetching(true);
		dispatch(getProducts(store.lastRefKey));
	};

	useEffect((): () => void => {
		if (store.productsLength === 0) {
			fetchProducts();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
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
					{children && children({ ...store })}
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

export default ProductList;
