import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilter, applyFilter } from 'redux/actions/filterActions';
import { selectMax, selectMin } from 'selectors/selector';

import PriceRange from './PriceRange';

const Filters = (props) => {
	const [isMounted, setMounted] = useState(false);
	const [field, setFilter] = useState({
		brand: props.filter.brand,
		minPrice: props.filter.minPrice,
		maxPrice: props.filter.maxPrice,
		sortBy: props.filter.sortBy
	});
	const dispatch = useDispatch();
	const max = selectMax(props.products);
	const min = selectMin(props.products);

	useEffect(() => {
		if (isMounted && window.screen.width <= 480) {
			props.history.push('/');
		}

		if (isMounted && props.closeModal) props.closeModal();

		setFilter(props.filter);
		setMounted(true);
		window.scrollTo(0, 0);
	}, [props.filter]);


	const onPriceChange = (min, max) => {
		setFilter({ ...field, minPrice: min, maxPrice: max });
	};

	const onBrandFilterChange = (e) => {
		const val = e.target.value;

		setFilter({ ...field, brand: val });
	};

	const onSortFilterChange = (e) => {
		setFilter({ ...field, sortBy: e.target.value });
	};


	const onApplyFilter = () => {
		const isChanged = Object.keys(field).some(key => field[key] !== props.filter[key]);

		if (field.minPrice > field.maxPrice) {
			return false;
		}

		if (isChanged) {
			dispatch(applyFilter(field));
		} else {
			props.closeModal();
		}
	};

	const onResetFilter = () => {
		const filterFields = ['brand', 'minPrice', 'maxPrice', 'sortBy'];

		if (filterFields.some(key => !!props.filter[key])) {
			dispatch(resetFilter());
		} else {
			props.closeModal();
		}
	};

	return (
		<div className="filters">
			<div className="filters-field">
				<span>Brand</span>
				<br />
				<br />
				{props.productsCount === 0 && props.isLoading ? (
					<h5 className="text-subtle">Loading Filter</h5>
				) : (
						<select
							className="filters-brand"
							value={field.brand}
							disabled={props.isLoading || props.productsCount === 0}
							onChange={onBrandFilterChange}
						>
							<option value="">All Brands</option>
							<option value="salt">Salt Maalat</option>
							<option value="betsin">Betsin Maalat</option>
							<option value="black">Black Kibal</option>
							<option value="sexbomb">Sexbomb</option>
						</select>
					)}
			</div>
			<div className="filters-field">
				<span>Sort By</span>
				<br />
				<br />
				<select
					className="filters-sort-by d-block"
					value={field.sortBy}
					disabled={props.isLoading || props.productsCount === 0}
					onChange={onSortFilterChange}
				>
					<option value="">None</option>
					<option value="name-asc">Name Ascending A - Z</option>
					<option value="name-desc">Name Descending Z - A</option>
					<option value="price-desc">Price High - Low</option>
					<option value="price-asc">Price Low - High</option>
				</select>
			</div>
			<div className="filters-field">
				<span>Price Range</span>
				<br />
				<br />
				{(props.productsCount === 0 && props.isLoading) || max === 0 ? (
					<h5 className="text-subtle">Loading Filter</h5>
				) : props.productsCount === 1 ? (
					<h5 className="text-subtle">No Price Range</h5>
				) : (
							<PriceRange
								min={min}
								max={max}
								initMin={field.minPrice}
								initMax={field.maxPrice}
								isLoading={props.isLoading}
								onPriceChange={onPriceChange}
								productsLength={props.productsCount}
							/>
						)}
			</div>
			<div className="filters-action">
				<button
					className="filters-button button button-small"
					disabled={props.isLoading || props.productsCount === 0}
					onClick={onApplyFilter}
				>
					Apply filters
        </button>
				<button
					className="filters-button button button-border button-small"
					disabled={props.isLoading || props.productsCount === 0}
					onClick={onResetFilter}
				>
					Reset filters
        </button>
			</div>
		</div>
	);
};

export default withRouter(Filters);
