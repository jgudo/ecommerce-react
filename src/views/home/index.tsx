import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'selectors/selector';

import ProductList from 'components/product/ProductList';
import ProductItem from 'components/product/ProductItem';
import ProductAppliedFilters from 'components/product/ProductAppliedFilters';
import Boundary from 'components/ui/Boundary';
import ProductModalDetails from 'components/product/ProductModalDetails';
import useModal from 'hooks/useModal';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { IProduct, RootState } from 'types/typings';

const Home: React.FC = () => {
	useDocumentTitle('Salinaka | React JS eCommerce Site');
	const [productSelected, setProductSelected] = useState<IProduct | {}>({});
	const [columnCount, setColumnCount] = useState(6);
	const { isOpenModal, onOpenModal, onCloseModal } = useModal();

	const { store } = useSelector((state: RootState) => ({
		store: {
			filter: state.filter,
			basket: state.basket,
			filteredProducts: selectFilter(state.products.items, state.filter),
			requestStatus: state.app.requestStatus
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

	const dispatch = useDispatch();
	const productListWrapper = useRef(null);

	const isFiltered: boolean = ['keyword', 'brand', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!store.filter[key]);
	const displaySelected = product => setProductSelected(product);
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
								<ProductModalDetails
									foundOnBasket={foundOnBasket}
									isOpenModal={isOpenModal}
									onCloseModal={onCloseModal}
									overrideStyle={{ padding: 0 }}
									product={productSelected}
								/>
								<div
									className="product-list"
									ref={productListWrapper}
									style={{ gridTemplateColumns: `repeat(${columnCount}, 160px)` }}
								>
									{filteredProducts.length === 0 ? new Array(12).fill({}).map((product, index) => (
										<ProductItem
											key={`product-skeleton ${index}`}
											product={product}
										/>
									)) : filteredProducts.map(product => (
										<ProductItem
											displaySelected={displaySelected}
											foundOnBasket={foundOnBasket}
											key={product.id}
											onOpenModal={onOpenModal}
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
