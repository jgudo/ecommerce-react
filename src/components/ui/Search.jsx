import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { setTextFilter } from '../../actions/filterActions';

const Search = (props) => {
  const { dispatch, productsLength, isLoading, searchFilter } = props;
  const [searchInput, setSearchInput] = useState(searchFilter)
  const isMobile = window.screen.width <= 480 ? true : false;

  const onSearchChange = (e) => {
    const val = e.target.value.trim();
    setSearchInput(val);
    
    if (val === '' && productsLength !== 0) {
      dispatch(setTextFilter(val));
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && productsLength !== 0) {
      dispatch(setTextFilter(searchInput));
      isMobile && props.history.push('/');
    }
  };

  return (
    <div className="searchbar">
      <input
          className="search-input searchbar-input" 
          onChange={onSearchChange}
          onKeyUp={onKeyUp}
          placeholder="Search for product"
          readOnly={isLoading}
          type="text" 
          value={searchInput}
      />
      <div className="searchbar-icon" />
    </div>
  );
};

export default withRouter(Search);
