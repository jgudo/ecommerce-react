import { EFilterActionType } from 'constants/constants';
import { FilterActionType, IFilter } from 'types/typings';

export const setTextFilter = (keyword: string): FilterActionType => ({
	type: EFilterActionType.SET_TEXT_FILTER,
	payload: keyword
});

export const setBrandFilter = (brand: string): FilterActionType => ({
	type: EFilterActionType.SET_BRAND_FILTER,
	payload: brand
});

export const setMinPriceFilter = (min: number): FilterActionType => ({
	type: EFilterActionType.SET_MIN_PRICE_FILTER,
	payload: min
});

export const setMaxPriceFilter = (max: number): FilterActionType => ({
	type: EFilterActionType.SET_MAX_PRICE_FILTER,
	payload: max
});

export const resetFilter = () => ({
	type: EFilterActionType.RESET_FILTER
});

export const clearRecentSearch = () => ({
	type: EFilterActionType.CLEAR_RECENT_SEARCH
});

export const removeSelectedRecent = (keyword: string): FilterActionType => ({
	type: EFilterActionType.REMOVE_SELECTED_RECENT,
	payload: keyword
});

export const applyFilter = (filters: Partial<IFilter>): FilterActionType => ({
	type: EFilterActionType.APPLY_FILTER,
	payload: filters
});
