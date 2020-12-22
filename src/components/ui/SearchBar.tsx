import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
	removeSelectedRecent,
	clearRecentSearch
} from 'redux/actions/filterActions';
import { IFilter } from 'types/types';
import { useHistory } from 'react-router';

interface IProps {
	filter: IFilter;
	isLoading: boolean;
	productsCount?: number;
	[propName: string]: any;
}

const SearchBar: React.FC<IProps> = ({
	filter,
	isLoading,
	productsCount
}) => {
	const history = useHistory();
	const [searchInput, setSearchInput] = useState(filter.keyword);
	const searchbarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setSearchInput(filter.keyword);
	}, [filter.keyword]);

	const dispatch = useDispatch();
	const isMobile = window.screen.width <= 800;

	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.trimStart();
		setSearchInput(val);
	};

	const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && productsCount !== 0) {
			(e.target as HTMLInputElement).blur();

			if (searchbarRef.current) {
				searchbarRef.current.classList.remove('is-open-recent-search');
			}

			if (isMobile) {
				history.push('/');
			}

			history.push(`/search/${searchInput.trim().toLowerCase()}`);
		}
	};

	const recentSearchClickHandler = (e: Event) => {
		const searchBar = (e.target as HTMLHeadingElement).closest('.searchbar');

		if (!searchBar && searchbarRef.current) {
			searchbarRef.current.classList.remove('is-open-recent-search');
			document.removeEventListener('click', recentSearchClickHandler);
		}
	};

	const onFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.select();

		if (filter.recent.length !== 0 && searchbarRef.current) {
			searchbarRef.current.classList.add('is-open-recent-search');
			document.addEventListener('click', recentSearchClickHandler);
		}
	};

	const onClickRecentSearch = (keyword: string) => {
		// dispatch(setTextFilter(keyword));

		searchbarRef.current && searchbarRef.current.classList.remove('is-open-recent-search');
		history.push(`/search/${keyword.trim().toLowerCase()}`);
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
					placeholder="Search product..."
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
				<i className="fa fa-search searchbar-icon" />
			</div>
		</>
	);
};

export default SearchBar;
