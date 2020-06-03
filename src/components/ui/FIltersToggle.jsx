import React, { useState } from 'react';
import Filters from './Filters';
import Modal from './Modal';
import { useDispatch } from 'react-redux';

import { 
  resetFilter, 
  setTextFilter, 
  removeSelectedRecent, 
  clearRecentSearch
} from 'actions/filterActions';  

const FiltersToggle = ({ 
  filter, 
  isLoading, 
  products,
  productsLength, 
  children 
}) => {
  const [isOpenModal, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="filters-toggle" onClick={onOpenModal}>
        {children}
      </div>
      <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
        <div className="filters-toggle-sub">
          <Filters 
              dispatch={dispatch}
              products={products}
              productsLength={productsLength}
              filter={filter}
              closeModal={onCloseModal}
              isLoading={isLoading}
          />
        </div>
        <button 
            className="modal-close-button"
            onClick={onCloseModal}
        >
          <i className="fa fa-times-circle" />
        </button>
      </Modal>
    </>
  );
};

export default FiltersToggle;
