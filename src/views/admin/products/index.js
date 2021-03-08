import { Boundary, FiltersToggle, SearchBar } from 'components/common';
import { AppliedFilters, ProductList } from 'components/product';
import { ADD_PRODUCT } from 'constants/routes';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from 'selectors/selector';
import { ProductItem } from '../components';


const Products = ({ history }) => {
	useDocumentTitle('Product List | Salinaka Admin');
	useScrollTop();

	const store = useSelector(state => ({
		filter: state.filter,
		basket: state.basket,
		filteredProducts: selectFilter(state.products.items, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		products: state.products.items,
		productsCount: state.products.items.length,
		totalProductsCount: state.products.total,
	}));

	const onClickAddProduct = () => {
		history.push(ADD_PRODUCT);
	};

	// TODO insufficient permission
	// TODO fix filters modal
	return (
		<Boundary>
			<div className="product-admin-header">
				<h3 className="product-admin-header-title">
					Products &nbsp;
					({`${store.productsCount} / ${store.totalProductsCount}`})
				</h3>
				<SearchBar
					filter={store.filter}
					isLoading={store.isLoading}
					productsCount={store.productsCount}
				/>
				&nbsp;
				<FiltersToggle
					filter={store.filter}
					isLoading={store.isLoading}
					products={store.products}
					productsCount={store.productsCount}
				>
					<button className="button-muted button-small">
						More Filters &nbsp;<i className="fa fa-chevron-right" />
					</button>
				</FiltersToggle>
				<button
					className="button button-small"
					onClick={onClickAddProduct}
				>
					Add New Product
				</button>
			</div>
			<div className="product-admin-items">
				<ProductList {...store}>
					{() => (
						<>
							<AppliedFilters filter={store.filter} />
							{store.filteredProducts.length > 0 && (
								<div className="grid grid-product grid-count-6">
									<div className="grid-col" />
									<div className="grid-col">
										<h5>Name</h5>
									</div>
									<div className="grid-col">
										<h5>Brand</h5>
									</div>
									<div className="grid-col">
										<h5>Price</h5>
									</div>
									<div className="grid-col">
										<h5>Date Added</h5>
									</div>
									<div className="grid-col">
										<h5>Qty</h5>
									</div>
								</div>
							)}
							{store.filteredProducts.length === 0 ? new Array(10).fill({}).map((product, index) => (
								<ProductItem
									key={`product-skeleton ${index}`}
									product={product}
								/>
							)) : store.filteredProducts.map(product => (
								<ProductItem
									key={product.id}
									product={product}
								/>
							))}
						</>
					)}
				</ProductList>
			</div>
		</Boundary>
	);
};

export default withRouter(Products);
