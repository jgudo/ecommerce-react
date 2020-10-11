import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import useDocumentTitle from 'hooks/useDocumentTitle';
import { addProduct } from 'redux/actions/productActions';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
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
			/>
		</div>
	);
};

export default withRouter(AddProduct);
