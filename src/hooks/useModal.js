import { useState } from 'react';

const useModal = () => {
  const [isOpenModal, setModalOpen] = useState(false);

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return { isOpenModal, onOpenModal, onCloseModal };
};

export default useModal;
