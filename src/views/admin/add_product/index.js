import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addProduct } from 'redux/actions/productActions';
import { ProductForm } from '../components';

const AddProduct = () => {
	useScrollTop();
	useDocumentTitle('Add New Product | Salinaka');
	const isLoading = useSelector(state => state.app.loading);
	const dispatch = useDispatch();

	const onSubmit = (product) => {
		dispatch(addProduct(product));
	};

	return (
		<div className="product-form-container">
			<h2>Add New Product</h2>
			<ProductForm
				isLoading={isLoading}
				onSubmit={onSubmit}
				product={{
					name: '',
					brand: '',
					price: 0,
					maxQuantity: 0,
					description: '',
					keywords: [],
					sizes: [],
					image: '',
					isFeatured: false,
					isRecommended: false,
					availableColors: [],
					imageCollection: []
				}}
			/>
		</div>
	);
};

export default withRouter(AddProduct);
