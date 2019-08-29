import React, { useRef } from 'react';
import Filters from './Filters';

const FiltersToggle = ({ 
  products, 
  productsLength, 
  filter, 
  isLoading,
  dispatch 
}) => {
  const toggleRef = useRef(null);

  const onClickToggle = () => {
    const target = toggleRef.current;
    if (target.classList.contains('is-open-filters')) {
      target.classList.remove('is-open-filters');
    } else {
      target.classList.add('is-open-filters');
    }
  };

  document.addEventListener('click', (e) => {
    const toggleClosest = e.target.closest('.filters-toggle');

    try {
      if (!toggleClosest && toggleRef.current.classList.contains('is-open-filters')) {
        toggleRef.current.classList.remove('is-open-filters')
      }
    } catch (e) {}
  });

  return (
    <div 
        className="filters-toggle"
        ref={toggleRef}
    >
      <button
          className="button button-small button-border button-border-gray"
          onClick={onClickToggle}
      >
        Filters
        <div className="filters-toggle-caret icon-caret" />
      </button>
      <div className="filters-toggle-sub">
        <Filters 
            dispatch={dispatch}
            products={products}
            productsLength={productsLength}
            filter={filter}
            isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FiltersToggle;
