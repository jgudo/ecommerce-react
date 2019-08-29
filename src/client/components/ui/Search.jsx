import React from 'react';
import { withRouter } from 'react-router-dom';
import { setTextFilter } from '../../actions/filterActions';

const Search = (props) => {
  const { dispatch, productsLength, isLoading } = props;
  let input = '';

  const onSearchChange = (e) => {
    const val = e.target.value.trim();
    input = val;
    
    if (val === '' && productsLength !== 0) {
      dispatch(setTextFilter(val));
      props.history.push('/');
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && productsLength !== 0) {
      dispatch(setTextFilter(input));
      props.history.push('/');
    }
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
      <div className="searchbar-icon" />
    </div>
  );
};

export default withRouter(Search);
