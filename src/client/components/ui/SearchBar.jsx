import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTextFilter } from '../../actions/filterActions';

const SearchBar = (props) => {
  const { isLoading, products } = useSelector(state => ({
    isLoading: state.app.loading,
    products: state.products
  }));
  const dispatch = useDispatch();
  let input = '';
  
  const onSubmitSearch = () => {
    products.length !== 0 && dispatch(setTextFilter(input));
  };

  const onSearchChange = (e) => {
    const val = e.target.value.trim();
    input = val;

    if (val === '' && products.length !== 0) dispatch(setTextFilter(val));
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && products.length !== 0) dispatch(setTextFilter(input));

  };

  return props.children({
    onSearchChange,
    onKeyUp,
    isLoading,
    onSubmitSearch
  });
};

export default SearchBar;
