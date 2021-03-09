import React from 'react';

const Pagination = ({
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
				type="submit"
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
