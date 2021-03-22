import PropType from 'prop-types';
import React from 'react';
import AppModal from 'react-modal';

const Modal = ({
  isOpen,
  onRequestClose,
  afterOpenModal,
  overrideStyle,
  children
}) => {
  const defaultStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      position: 'fixed',
      padding: '50px 20px',
      transition: 'all .5s ease',
      zIndex: 9999,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 5px 10px rgba(0, 0, 0, .1)',
      animation: 'scale .3s ease',
      ...overrideStyle
    }
  };

  AppModal.setAppElement('#app');

  return (
    <AppModal
      closeTimeoutMS={300}
      contentLabel="Product Modal"
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      style={defaultStyle}
    >
      {children}
    </AppModal>
  );
};

Modal.defaultProps = {
  overrideStyle: {},
  afterOpenModal: () => { }
};

Modal.propTypes = {
  isOpen: PropType.bool.isRequired,
  onRequestClose: PropType.func.isRequired,
  afterOpenModal: PropType.func,
  // eslint-disable-next-line react/forbid-prop-types
  overrideStyle: PropType.object,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default Modal;
