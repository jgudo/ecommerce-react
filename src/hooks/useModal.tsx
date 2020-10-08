import { useState } from 'react';

const useModal = () => {
	const [isOpenModal, setModalOpen] = useState(false);

	const onOpenModal = (): void => {
		setModalOpen(true);
	};

	const onCloseModal = (): void => {
		setModalOpen(false);
	};

	return { isOpenModal, onOpenModal, onCloseModal } as const;
};

export default useModal;
