import React from 'react';
import AppModal from 'react-modal';

const Modal = ({ 
  isOpen, 
  onRequestClose, 
  afterOpenModal, 
  children 
}) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      position: 'fixed',
      paddingTop: '50px',
      paddingBottom: '50px',
      transition: 'all .5s ease',
      zIndex: 9999,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 5px 10px rgba(0, 0, 0, .1)',
      animation: 'scale .3s ease'
    }
  };

  AppModal.setAppElement('#app');

  return (
    <AppModal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={onRequestClose}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        contentLabel="Product Modal"
    >
      {children}
    </AppModal>
  );
};

export default Modal;
