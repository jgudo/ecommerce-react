// tslint:disable: no-array-mutation
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from 'selectors/selector';

import ProductList from 'components/product/ProductList';
import ProductItem from 'components/product/ProductItem';
import ProductAppliedFilters from 'components/product/ProductAppliedFilters';
import Boundary from 'components/ui/Boundary';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { RootState } from 'types/types';

<<<<<<< HEAD:src/views/home/index.tsx
const Home: React.FC = () => {
	useDocumentTitle('Salinaka | React JS eCommerce Site');
=======
const Home = () => {
	useDocumentTitle();
>>>>>>> 8577603228250acd4278f07b4a77199e7a391d5f:src/views/home/index.js
	const [columnCount, setColumnCount] = useState(6);

	const { store } = useSelector((state: RootState) => ({
		store: {
			filter: state.filter,
			basket: state.basket,
			filteredProducts: selectFilter(state.products.items, state.filter),
			requestStatus: state.app.requestStatus,
			isLoading: state.app.loading
		}
	}));

	const onProductsLengthChanged = (): void => {
		const width = window.screen.width - 250; // minus 250px padding

		setColumnCount(Math.floor(width / 160));
		if ((columnCount >= store.filteredProducts.length) && store.filteredProducts.length !== 0) {
			setColumnCount(store.filteredProducts.length);
		}
	};

	useEffect(() => {
		onProductsLengthChanged();
	}, [store.filteredProducts]);

	const productListWrapper = useRef(null);

<<<<<<< HEAD:src/views/home/index.tsx
	const isFiltered: boolean = ['keyword', 'brand', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!store.filter[key]);
=======
	const isFiltered = ['keyword', 'brand', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!store.filter[key]);
>>>>>>> 8577603228250acd4278f07b4a77199e7a391d5f:src/views/home/index.js
	const foundOnBasket = id => !!store.basket.find(item => item.id === id);

	return (
		<>
			<section className="product-list-wrapper">
				{!store.requestStatus && (
					<div className="product-list-header">
						<div className="product-list-header-title">
							{isFiltered && (
								<h5>
									{store.filteredProducts.length > 0
										&& `Found ${store.filteredProducts.length} ${store.filteredProducts.length > 1 ? 'products' : 'product'}`
									}
								</h5>
							)}
						</div>
					</div>
				)}
				<ProductAppliedFilters filter={store.filter} />
				<Boundary>
					<ProductList>
						{({ filteredProducts }) => (
							<>
								<div
									className="product-list"
									ref={productListWrapper}
									style={{ gridTemplateColumns: `repeat(${columnCount}, 160px)` }}
								>
									{filteredProducts.length === 0 ? new Array(12).fill({}).map((product, index) => (
										<ProductItem
											foundOnBasket={foundOnBasket}
											key={`product-skeleton ${index}`}
											product={product}
										/>
									)) : filteredProducts.map(product => (
										<ProductItem
<<<<<<< HEAD:src/views/home/index.tsx
											foundOnBasket={foundOnBasket}
											key={product.id}
=======
											foundOnBasket={foundOnBasket(product.id)}
											key={product.id}
											isLoading={store.isLoading}
>>>>>>> 8577603228250acd4278f07b4a77199e7a391d5f:src/views/home/index.js
											product={product}
										/>
									))}
								</div>
							</>
						)}
					</ProductList>
				</Boundary>
			</section>
		</>
	);
};

export default Home;
