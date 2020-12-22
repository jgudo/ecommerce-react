/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IProduct } from 'types/types';
import { getProducts } from 'redux/actions/productActions';
import { setLoading } from 'redux/actions/miscActions';
import MessageDisplay from '../ui/MessageDisplay';

interface IProps {
	productsCount: number;
	products: IProduct[];
	lastRefKey: any;
	totalProductsCount: number;
	isLoading: boolean;
	filteredProducts: IProduct[];
	requestStatus: string | null;
	basket?: IProduct[];
	children: (obj: any) => JSX.Element;
}

const ProductList: React.FC<IProps> = (props) => {
	const [isFetching, setFetching] = useState(false);
	const dispatch = useDispatch();
	const fetchProducts = (): void => {
		setFetching(true);
		dispatch(getProducts(props.lastRefKey));
	};

	useEffect((): () => void => {
		if (props.productsCount === 0 || !props.lastRefKey) {
			fetchProducts();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
	}, []);

	useEffect(() => {
		setFetching(false);
	}, [props.lastRefKey]);

	const foundOnBasket = (id: string) => {
		if (!props.basket) return false;

		return props.basket.find(item => item.id === id);

	};

	return props.filteredProducts.length === 0 && !props.isLoading && !props.lastRefKey ? (
		<MessageDisplay
			message={props.requestStatus ? props.requestStatus : 'Failed to fetch items.'}
		/>
	) : props.requestStatus ? (
		<MessageDisplay
			message={props.requestStatus}
			action={fetchProducts}
			buttonLabel="Try Again"
		/>
	) : (
				<>
					{props.children({ foundOnBasket })}
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
			);
};

export default ProductList;
