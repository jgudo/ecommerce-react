import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTextFilter } from '../../actions/filterActions';

const SearchBar = (props) => {
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

  return props.children({
    onSearchChange,
    onKeyUp,
    isLoading,
    onSubmitSearch
  });
};

export default SearchBar;
