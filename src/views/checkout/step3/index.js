import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { CHECKOUT_STEP_2 } from 'constants/routes';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { setPaymentDetails } from 'actions/checkoutActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import withAuth from '../hoc/withAuth';

const Payment = ({
	shipping,
	payment,
	subtotal,
	dispatch,
	history
}) => {
	useDocumentTitle('Check Out Final Step | Salinaka');
	const [paymentMode, setPaymentMode] = useState(payment.type || 'paypal');
	const collapseCreditHeight = useRef(null);
	const cardInputRef = useRef(null);
	const [field, setField] = useState({
		name: { value: payment.data.name ? payment.data.name : '' },
		cardnumber: { value: payment.data.cardnumber ? payment.data.cardnumber : '' },
		expiry: { value: payment.data.expiry ? payment.data.expiry : '' },
		ccv: { value: payment.data.ccv ? payment.data.ccv : '' }
	});

	const onCreditModeChange = (e) => {
		setPaymentMode('credit');
		const parent = e.target.closest('.checkout-fieldset-collapse');
		const checkBoxContainer = e.target.closest('.checkout-checkbox-field');

		cardInputRef.current.focus();
		parent.style.height = `${checkBoxContainer.offsetHeight + collapseCreditHeight.current.offsetHeight}px`;
	};

	const onPayPalModeChange = () => {
		setPaymentMode('paypal');
		collapseCreditHeight.current.parentElement.style.height = '97px';
	};

	const savePaymentDetails = () => {
		const isChanged = Object.keys(field).some(key => field[key].value !== payment.data[key]) || paymentMode !== payment.type;

		if (isChanged) {
			dispatch(setPaymentDetails({
				type: paymentMode,
				data: {
					type: paymentMode,
					name: field.name.value,
					cardnumber: field.cardnumber.value,
					expiry: field.expiry.value,
					ccv: field.ccv.value
				}
			}));
		}
	};

	const onConfirm = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast
		const noError = Object.keys(field).every(key => !!field[key].value && !!!field[key].error);

		if (!paymentMode) return;
		if (paymentMode === 'credit') {
			if (noError) {
				displayActionMessage('Feature not ready yet :)', 'info');
				// TODO: fire only if changed
				savePaymentDetails();
				// Do some action here. :)
			} else {
				displayActionMessage('All credentials for credit payment required!', 'error');
			}
		} else {
			displayActionMessage('Feature not ready yet :)', 'info');
		}
	};

	const onClickBack = () => {
		savePaymentDetails();
		history.push(CHECKOUT_STEP_2);
	};

	return !shipping.isDone ? <Redirect to="/checkout/step1" />
		: (
			<div className="checkout">
				<StepTracker current={3} />
				<div className="checkout-step-3">
					<CreditPayment
						field={field}
						onCreditModeChange={onCreditModeChange}
						paymentMode={paymentMode}
						ref={{
							cardInputRef,
							collapseCreditHeight
						}}
						setField={setField}
					/>
					<PayPalPayment
						onPayPalModeChange={onPayPalModeChange}
						paymentMode={paymentMode}
					/>
					<br />
					<div className="basket-total text-right">
						<p className="basket-total-title">Total:</p>
						<h2 className="basket-total-amount">{displayMoney(subtotal + (shipping.isInternational ? 50 : 0))}</h2>
					</div>
					<br />
					<Pagination
						// eslint-disable-next-line no-extra-boolean-cast
						disabledNext={!!!paymentMode}
						history={history}
						nextStepLabel="Confirm"
						onClickNext={onConfirm}
						onClickPrevious={onClickBack}

					/>
				</div>
			</div>
		);
};

export default withAuth(Payment);
