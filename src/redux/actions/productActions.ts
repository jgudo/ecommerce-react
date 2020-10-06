import { EProductActionType } from 'constants/constants';
import { IProduct, ProductActionType, ProductState } from 'types/typings';

export const getProducts = (lastRef: any): ProductActionType => ({
	type: EProductActionType.GET_PRODUCTS,
	payload: lastRef
});

export const getProductsSuccess = (data: ProductState): ProductActionType => ({
	type: EProductActionType.GET_PRODUCTS_SUCCESS,
	payload: data
});

export const cancelGetProducts = () => ({
	type: EProductActionType.CANCEL_GET_PRODUCTS
});

export const addProduct = (product: IProduct) => ({
	type: EProductActionType.ADD_PRODUCT,
	payload: product
});

export const addProductSuccess = (product: IProduct): ProductActionType => ({
	type: EProductActionType.ADD_PRODUCT_SUCCESS,
	payload: product
});

export const removeProduct = (id: string): ProductActionType => ({
	type: EProductActionType.REMOVE_PRODUCT,
	payload: id
});

export const removeProductSuccess = (id: string): ProductActionType => ({
	type: EProductActionType.REMOVE_PRODUCT_SUCCESS,
	payload: id
});

export const editProduct = (id: string, updates: Partial<IProduct>): ProductActionType => ({
	type: EProductActionType.EDIT_PRODUCT,
	payload: {
		id,
		updates
	}
});

export const editProductSuccess = (updates: { id: string, updates: Partial<IProduct> }): ProductActionType => ({
	type: EProductActionType.EDIT_PRODUCT_SUCCESS,
	payload: updates
});
