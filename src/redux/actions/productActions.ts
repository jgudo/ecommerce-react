import { EProductActionType } from 'constants/constants';
import { IProduct, ProductState } from 'types/types';
import { DocumentData } from '@firebase/firestore-types';

export const getProducts = (lastRefKey: DocumentData | undefined, searchKey?: string) => (<const>{
	type: EProductActionType.GET_PRODUCTS,
	payload: {
		lastRefKey,
		searchKey
	}
});

export const getProductsSuccess = (data: ProductState) => (<const>{
	type: EProductActionType.GET_PRODUCTS_SUCCESS,
	payload: data
});

export const cancelGetProducts = () => (<const>{
	type: EProductActionType.CANCEL_GET_PRODUCTS
});

export const addProduct = (product: IProduct) => (<const>{
	type: EProductActionType.ADD_PRODUCT,
	payload: product
});

export const addProductSuccess = (product: IProduct) => (<const>{
	type: EProductActionType.ADD_PRODUCT_SUCCESS,
	payload: product
});

export const searchProduct = (lastRefKey: DocumentData | undefined, searchKey?: string) => (<const>{
	type: EProductActionType.SEARCH_PRODUCT,
	payload: {
		lastRefKey,
		searchKey
	}
});

export const searchProductSuccess = (products: ProductState) => (<const>{
	type: EProductActionType.SEARCH_PRODUCT_SUCCESS,
	payload: products
});

export const clearSearchState = () => (<const>{
	type: EProductActionType.CLEAR_SEARCH_STATE
});

export const removeProduct = (id: string) => (<const>{
	type: EProductActionType.REMOVE_PRODUCT,
	payload: id
});

export const removeProductSuccess = (id: string) => (<const>{
	type: EProductActionType.REMOVE_PRODUCT_SUCCESS,
	payload: id
});

export const editProduct = (id: string, updates: Partial<IProduct>) => (<const>{
	type: EProductActionType.EDIT_PRODUCT,
	payload: {
		id,
		updates
	}
});

export const editProductSuccess = (updates: { id: string, updates: Partial<IProduct> }) => (<const>{
	type: EProductActionType.EDIT_PRODUCT_SUCCESS,
	payload: updates
});

export type ProductActionType =
	| ReturnType<typeof getProducts>
	| ReturnType<typeof getProductsSuccess>
	| ReturnType<typeof searchProduct>
	| ReturnType<typeof searchProductSuccess>
	| ReturnType<typeof clearSearchState>
	| ReturnType<typeof cancelGetProducts>
	| ReturnType<typeof addProduct>
	| ReturnType<typeof addProductSuccess>
	| ReturnType<typeof removeProduct>
	| ReturnType<typeof removeProductSuccess>
	| ReturnType<typeof editProduct>
	| ReturnType<typeof editProductSuccess>;