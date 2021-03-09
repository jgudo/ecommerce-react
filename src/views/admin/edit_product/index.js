import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { editProduct } from 'redux/actions/productActions';
import { ProductForm } from '../components';

const EditProduct = (props) => {
	useDocumentTitle('Edit Product | Salinaka');
	useScrollTop();
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
			{(!product && !isLoading) && <Redirect to="/dashboard/products" />}
			<h2>Edit Product</h2>
			{product && (
				<ProductForm
					isLoading={isLoading}
					onSubmit={onSubmitForm}
					product={product}
				/>
			)}
		</div>
	);
};

export default withRouter(EditProduct);
