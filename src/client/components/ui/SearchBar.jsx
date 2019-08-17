import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTextFilter } from '../../actions/filterActions';

const SearchBar = () => {
  const isLoading = useSelector(state => state.app.loading);
  const dispatch = useDispatch();
  let input = '';
  
  const onSubmitSearch = () => {
    dispatch(setTextFilter(input));
  };

  const onSearchChange = (e) => {
    const val = e.target.value.trim();
    input = val;

    if (val === '') dispatch(setTextFilter(val));
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) dispatch(setTextFilter(input));
  };

  return (
    <div className="searchbar">
      <input
          className="searchbar-input" 
          onChange={onSearchChange}
          onKeyUp={onKeyUp}
          placeholder="Search for product"
          readOnly={isLoading}
          type="text" 
      />
      <button 
          className="button button-small searchbar-button"
          disabled={isLoading}
          onClick={onSubmitSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
