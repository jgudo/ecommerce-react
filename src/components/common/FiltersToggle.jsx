import { useModal } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import Filters from './Filters';
import Modal from './Modal';

const FiltersToggle = ({ children }) => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      <div
        className="filters-toggle"
        onClick={onOpenModal}
        role="presentation"
      >
        {children}
      </div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={onCloseModal}
      >
        <div className="filters-toggle-sub">
          <Filters closeModal={onCloseModal} />
        </div>
        <button
          className="modal-close-button"
          onClick={onCloseModal}
          type="button"
        >
          <i className="fa fa-times-circle" />
        </button>
      </Modal>
    </>
  );
};

FiltersToggle.propTypes = {
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default FiltersToggle;
