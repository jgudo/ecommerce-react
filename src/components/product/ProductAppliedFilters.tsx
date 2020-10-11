/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch } from 'react-redux';
import { applyFilter } from 'redux/actions/filterActions';
import { IFilter } from 'types/types';

interface IProps {
	filter: IFilter;
}

const ProductAppliedFilters: React.FC<IProps> = ({ filter }) => {
	const dispatch = useDispatch();
	const fields: string[] = ['brand', 'minPrice', 'maxPrice', 'sortBy', 'keyword'];

	const onRemoveKeywordFilter = (): void => {
		dispatch(applyFilter({ keyword: '' }));
	};

	const onRemovePriceRangeFilter = (): void => {
		dispatch(applyFilter({ minPrice: 0, maxPrice: 0 }));
	};

	const onRemoveBrandFilter = (): void => {
		dispatch(applyFilter({ brand: '' }));
	};

	const onRemoveSortFilter = (): void => {
		dispatch(applyFilter({ sortBy: '' }));
	};

	return !fields.some(key => !!filter[key]) ? null : (
		<div className="product-applied-filters">
			{filter.keyword && (
				<div className="pill-wrapper">
					<span className="d-block">Keyword</span>
					<div className="pill padding-right-l">
						<h5 className="pill-content margin-0">{filter.keyword}</h5>
						<div className="pill-remove" onClick={onRemoveKeywordFilter}>
							<h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
						</div>
					</div>
				</div>
			)}
			{filter.brand && (
				<div className="pill-wrapper">
					<span className="d-block">Brand</span>
					<div className="pill padding-right-l">
						<h5 className="pill-content margin-0">{filter.brand}</h5>
						<div className="pill-remove" onClick={onRemoveBrandFilter}>
							<h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
						</div>
					</div>
				</div>
			)}
			{(!!filter.minPrice || !!filter.maxPrice) && (
				<div className="pill-wrapper">
					<span className="d-block">Price Range</span>
					<div className="pill padding-right-l">
						<h5 className="pill-content margin-0">${filter.minPrice} - ${filter.maxPrice}</h5>
						<div className="pill-remove" onClick={onRemovePriceRangeFilter}>
							<h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
						</div>
					</div>
				</div>
			)}
			{filter.sortBy && (
				<div className="pill-wrapper">
					<span className="d-block">Sort By</span>
					<div className="pill padding-right-l">
						<h5 className="pill-content margin-0">
							{filter.sortBy === 'price-desc'
								? 'Price High - Low'
								: filter.sortBy === 'price-asc'
									? 'Price Low - High'
									: filter.sortBy === 'name-desc'
										? 'Name Z - A'
										: 'Name A - Z'
							}
						</h5>
						<div
							className="pill-remove"
							onClick={onRemoveSortFilter}
						>
							<h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductAppliedFilters;
