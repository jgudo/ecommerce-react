import React from 'react';

interface IProps {
	nextStepLabel?: string;
	previousLabel?: string;
	disabledNext?: boolean;
	onClickNext: (e: any) => void;
	onClickPrevious?: () => void;
	previousVisible?: boolean;
}

const Pagination: React.FC<IProps> = ({
	nextStepLabel,
	previousLabel,
	disabledNext,
	onClickNext,
	onClickPrevious,
	previousVisible
}) => {
	return (
		<div className="checkout-shipping-action">
			{previousVisible && (
				<button
					className="button button-muted"
					onClick={onClickPrevious}
					type="button"
				>
					{previousLabel}
				</button>
			)}
			<button
				className="button"
				disabled={disabledNext}
				onClick={onClickNext}
			>
				{nextStepLabel}
			</button>
		</div>
	);
};

Pagination.defaultProps = {
	nextStepLabel: 'Next Step',
	previousLabel: 'Go Back',
	previousVisible: true
};

export default Pagination;
