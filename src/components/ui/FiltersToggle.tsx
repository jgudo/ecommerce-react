import React from 'react';
import useModal from 'hooks/useModal';
import Filters from './Filters';
import Modal from './Modal';
import { IFilter, IProduct } from 'types/types';

interface IProps {
	filter: IFilter;
	isLoading: boolean;
	products: IProduct[];
	productsCount: number;
	children: React.ReactNode;
}

const FiltersToggle: React.FC<IProps> = (props) => {
	const { isOpenModal, onOpenModal, onCloseModal } = useModal();

	return (
		<>
			<div
				className="filters-toggle"
				onClick={onOpenModal}
			>
				{props.children && props.children}
			</div>
			<Modal
				isOpen={isOpenModal}
				onRequestClose={onCloseModal}
			>
				<div className="filters-toggle-sub">
					<Filters
						closeModal={onCloseModal}
						filter={props.filter}
						isLoading={props.isLoading}
						products={props.products}
						productsCount={props.productsCount}
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
