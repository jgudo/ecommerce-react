import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { editProduct } from 'actions/productActions';

import ProductForm from '../components/ProductForm';

const EditProduct = (props) => {
	const { product, isLoading } = useSelector(state => ({
		product: state.products.items.find(item => item.id === props.match.params.id),
		isLoading: state.app.loading
	}));
	const dispatch = useDispatch();

	const onSubmitForm = (updates) => {
		dispatch(editProduct(product.id, updates));
	};

	return (
		<div className="product-form-container">
			{!product && <Redirect to="/dashboard/products" />}
			<h2>Edit Product</h2>
			<ProductForm
				isLoading={isLoading}
				onSubmit={onSubmitForm}
				product={product}
			/>
		</div>
	);
};

export default withRouter(EditProduct);
