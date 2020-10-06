import { EBasketActionType } from 'constants/constants';
import { BasketActionType, IProduct } from 'types/typings';

export const addToBasket = (product: IProduct): BasketActionType => ({
	type: EBasketActionType.ADD_TO_BASKET,
	payload: product
});

export const removeFromBasket = (id: string): BasketActionType => ({
	type: EBasketActionType.REMOVE_FROM_BASKET,
	payload: id
});

export const clearBasket = (): BasketActionType => ({
	type: EBasketActionType.CLEAR_BASKET
});

export const addQtyItem = (id: string): BasketActionType => ({
	type: EBasketActionType.ADD_QTY_ITEM,
	payload: id
});

export const minusQtyItem = (id: string): BasketActionType => ({
	type: EBasketActionType.MINUS_QTY_ITEM,
	payload: id
});
