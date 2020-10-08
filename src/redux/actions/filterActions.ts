import { EFilterActionType } from 'constants/constants';
import { IFilter } from 'types/typings';

export const setTextFilter = (keyword: string) => (<const>{
	type: EFilterActionType.SET_TEXT_FILTER,
	payload: keyword
});

export const setBrandFilter = (brand: string) => (<const>{
	type: EFilterActionType.SET_BRAND_FILTER,
	payload: brand
});

export const setMinPriceFilter = (min: number) => (<const>{
	type: EFilterActionType.SET_MIN_PRICE_FILTER,
	payload: min
});

export const setMaxPriceFilter = (max: number) => (<const>{
	type: EFilterActionType.SET_MAX_PRICE_FILTER,
	payload: max
});

export const resetFilter = () => (<const>{
	type: EFilterActionType.RESET_FILTER
});

export const clearRecentSearch = () => (<const>{
	type: EFilterActionType.CLEAR_RECENT_SEARCH
});

export const removeSelectedRecent = (keyword: string) => (<const>{
	type: EFilterActionType.REMOVE_SELECTED_RECENT,
	payload: keyword
});

export const applyFilter = (filters: Partial<IFilter>) => (<const>{
	type: EFilterActionType.APPLY_FILTER,
	payload: filters
});

export type FilterActionType =
	| ReturnType<typeof setTextFilter>
	| ReturnType<typeof setBrandFilter>
	| ReturnType<typeof setMaxPriceFilter>
	| ReturnType<typeof setMinPriceFilter>
	| ReturnType<typeof resetFilter>
	| ReturnType<typeof clearRecentSearch>
	| ReturnType<typeof removeSelectedRecent>
	| ReturnType<typeof applyFilter>;