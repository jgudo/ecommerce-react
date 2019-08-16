import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../../actions/filterActions';

const SearchBar = ({ dispatchSetTextFilter, isLoading }) => {
  let input = '';
  const onSubmitSearch = () => {
    dispatchSetTextFilter(input);
  };

  const onSearchChange = (e) => {
    const val = e.target.value.trim();
    input = val;

    if (val === '') dispatchSetTextFilter(val);
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) dispatchSetTextFilter(input);
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

const mapStateToProps = ({ app }) => ({
  isLoading: app.loading
});

const mapDispatchToProps = dispatch => ({
  dispatchSetTextFilter: keyword => dispatch(setTextFilter(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
