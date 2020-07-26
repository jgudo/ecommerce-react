import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
	setTextFilter,
	removeSelectedRecent,
	clearRecentSearch
} from 'actions/filterActions';

const SearchBar = ({
	filter,
	isLoading,
	productsLength,
	history
}) => {
	const [searchInput, setSearchInput] = useState(filter.keyword);
	const searchbarRef = useRef(null);

	useEffect(() => {
		setSearchInput(filter.keyword);
	}, [filter.keyword]);

	const dispatch = useDispatch();
	const isMobile = window.screen.width <= 480;

	const onSearchChange = (e) => {
		const val = e.target.value.trimStart();
		setSearchInput(val);
	};

	const onKeyUp = (e) => {
		if (e.keyCode === 13 && productsLength !== 0) {
			dispatch(setTextFilter(searchInput));
			e.target.blur();
			searchbarRef.current.classList.remove('is-open-recent-search');

			if (isMobile) {
				history.push('/');
			}
		}
	};

	const recentSearchClickHandler = (e) => {
		const searchBar = e.target.closest('.searchbar');

		if (!searchBar) {
			searchbarRef.current.classList.remove('is-open-recent-search');
			document.removeEventListener('click', recentSearchClickHandler);
		}
	};

	const onFocusInput = (e) => {
		e.target.select();

		if (filter.recent.length !== 0) {
			searchbarRef.current.classList.add('is-open-recent-search');
			document.addEventListener('click', recentSearchClickHandler);
		}
	};

	const onClickRecentSearch = (keyword) => {
		dispatch(setTextFilter(keyword));
		searchbarRef.current.classList.remove('is-open-recent-search');
	};

	const onClearRecent = () => {
		dispatch(clearRecentSearch());
	};

	return (
		<>
			<div className="searchbar" ref={searchbarRef}>
				<input
					className="search-input searchbar-input"
					onChange={onSearchChange}
					onKeyUp={onKeyUp}
					onFocus={onFocusInput}
					placeholder="Filter products by keyword"
					readOnly={isLoading}
					type="text"
					value={searchInput}
				/>
				{filter.recent.length !== 0 && (
					<div className="searchbar-recent">
						<div className="searchbar-recent-header">
							<h5>Recent Search</h5>
							<h5
								className="searchbar-recent-clear text-subtle"
								onClick={onClearRecent}
							>
								Clear
							</h5>
						</div>
						{filter.recent.map((item, index) => (
							<div
								className="searchbar-recent-wrapper"
								key={`search-${item}-${index}`}
							>
								<h5
									className="searchbar-recent-keyword margin-0"
									onClick={() => onClickRecentSearch(item)}
								>
									{item}
								</h5>
								<span
									className="searchbar-recent-button text-subtle"
									onClick={() => dispatch(removeSelectedRecent(item))}
								>
									X
								</span>
							</div>
						))}
					</div>
				)}
				<i className="fa fa-filter searchbar-icon" />
			</div>
		</>
	);
};

export default SearchBar;
