import { EBasketActionType } from 'constants/constants';
import { IProduct } from 'types/typings';

export const addToBasket = (product: IProduct) => (<const>{
	type: EBasketActionType.ADD_TO_BASKET,
	payload: product
});

export const removeFromBasket = (id: string) => (<const>{
	type: EBasketActionType.REMOVE_FROM_BASKET,
	payload: id
});

export const clearBasket = () => (<const>{
	type: EBasketActionType.CLEAR_BASKET
});

export const addQtyItem = (id: string) => (<const>{
	type: EBasketActionType.ADD_QTY_ITEM,
	payload: id
});

export const minusQtyItem = (id: string) => (<const>{
	type: EBasketActionType.MINUS_QTY_ITEM,
	payload: id
});

export type BasketActionType =
	| ReturnType<typeof addToBasket>
	| ReturnType<typeof removeFromBasket>
	| ReturnType<typeof clearBasket>
	| ReturnType<typeof addQtyItem>
	| ReturnType<typeof minusQtyItem>;