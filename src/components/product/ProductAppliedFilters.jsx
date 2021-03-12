/* eslint-disable no-nested-ternary */
import { CloseCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { applyFilter } from 'redux/actions/filterActions';

const ProductAppliedFilters = ({ filteredProductsCount }) => {
	const filter = useSelector(state => state.filter, shallowEqual);
	const fields = ['brand', 'minPrice', 'maxPrice', 'sortBy', 'keyword'];
	const isFiltered = fields.some(key => !!filter[key]);
	const dispatch = useDispatch();

	const onRemoveKeywordFilter = () => {
		dispatch(applyFilter({ keyword: '' }));
	};

	const onRemovePriceRangeFilter = () => {
		dispatch(applyFilter({ minPrice: 0, maxPrice: 0 }));
	};

	const onRemoveBrandFilter = () => {
		dispatch(applyFilter({ brand: '' }));
	};

	const onRemoveSortFilter = () => {
		dispatch(applyFilter({ sortBy: '' }));
	};

	return !isFiltered ? null : (
		<>
			<div className="product-list-header">
				<div className="product-list-header-title">
					<h5>
						{filteredProductsCount > 0
							&& `Found ${filteredProductsCount} ${filteredProductsCount > 1 ? 'products' : 'product'}`
						}
					</h5>
				</div>
			</div>
			<div className="product-applied-filters">
				{filter.keyword && (
					<div className="pill-wrapper">
						<span className="d-block">Keyword</span>
						<div className="pill padding-right-l">
							<h5 className="pill-content margin-0">{filter.keyword}</h5>
							<div className="pill-remove" onClick={onRemoveKeywordFilter}>
								<h5 className="margin-0 text-subtle">
									<CloseCircleOutlined />
								</h5>
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
								<h5 className="margin-0 text-subtle">
									<CloseCircleOutlined />
								</h5>
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
								<h5 className="margin-0 text-subtle">
									<CloseCircleOutlined />
								</h5>
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
								<h5 className="margin-0 text-subtle">
									<CloseCircleOutlined />
								</h5>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

ProductAppliedFilters.propType = {
	filter: PropTypes.shape({
		brand: PropTypes.string,
		keyword: PropTypes.string,
		minPrice: PropTypes.number,
		maxPrice: PropTypes.number
	})
};

export default ProductAppliedFilters;
