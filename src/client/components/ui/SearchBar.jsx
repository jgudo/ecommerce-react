import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTextFilter, resetFilter } from '../../actions/filterActions';

const SearchBar = (props) => {
  const { isLoading, products, filter } = useSelector(state => ({
    isLoading: state.app.loading,
    products: state.products,
    filter: state.filter
  }));
  const dispatch = useDispatch();
  let input = '';
  
  const onSubmitSearch = () => {
    if (products.length !== 0) {
      dispatch(setTextFilter(input));
      props.history.push('/');
    }
  };

  const onSearchChange = (e) => {
    const val = e.target.value.trim();
    input = val;

    if (val === '' && products.length !== 0) {
      dispatch(setTextFilter(val));
      props.history.push('/');
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && products.length !== 0) {
      dispatch(setTextFilter(input));
      props.history.push('/');
    }
  };

  const onClearFilter = () => {
    dispatch(resetFilter());
  };

  const isFilterApplied = () => {
    return (!!filter.keyword || !!filter.brand || !!filter.minPrice || !!filter.maxPrice);
  }

  return props.children({
    onSearchChange,
    onKeyUp,
    isLoading,
    onSubmitSearch,
    onClearFilter,
    isFilterApplied
  });
};

export default withRouter(SearchBar);
