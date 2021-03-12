import { useModal } from 'hooks';
import React from 'react';
import { useDispatch } from 'react-redux';
import Filters from './Filters';
import Modal from './Modal';

const FiltersToggle = ({ children }) => {

	const { isOpenModal, onOpenModal, onCloseModal } = useModal();
	const dispatch = useDispatch();

	return (
		<>
			<div
				className="filters-toggle"
				onClick={onOpenModal}
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
				>
					<i className="fa fa-times-circle" />
				</button>
			</Modal>
		</>
	);
};

export default FiltersToggle;
