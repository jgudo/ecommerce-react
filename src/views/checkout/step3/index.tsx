import React, { useState, useRef } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { Route } from 'constants/routes';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { setPaymentDetails } from 'redux/actions/checkoutActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import withAuth from '../hoc/withAuth';
import { CREDIT, PAYPAL } from 'constants/constants';
import { IPaymentInfo, IShippingInfo } from 'types/types';
import { useDispatch } from 'react-redux';
import useScrollTop from 'hooks/useScrollTop';

interface IProps extends RouteComponentProps {
	shipping: IShippingInfo;
	payment: IPaymentInfo;
	subtotal: number;
}

const Payment: React.FC<IProps> = ({
	shipping,
	payment,
	subtotal,
	history
}) => {
	useDocumentTitle('Check Out Final Step | Salinaka');
	useScrollTop();

	const [paymentMode, setPaymentMode] = useState(payment.type || PAYPAL);
	const collapseCreditHeight = useRef<HTMLDivElement | null>(null);
	const cardInputRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useDispatch();
	const [field, setField] = useState({
		name: { value: payment.data.name ? payment.data.name : '' },
		cardnumber: { value: payment.data.cardnumber ? payment.data.cardnumber : '' },
		expiry: { value: payment.data.expiry ? payment.data.expiry : '' },
		ccv: { value: payment.data.ccv ? payment.data.ccv : '' }
	});

	const onCreditModeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPaymentMode(CREDIT);
		const parent = e.target.closest('.checkout-fieldset-collapse');
		const checkBoxContainer = e.target.closest('.checkout-checkbox-field');

		if (cardInputRef.current && collapseCreditHeight.current && parent && checkBoxContainer) {
			cardInputRef.current.focus();
			(parent as HTMLDivElement).style.height = `${(checkBoxContainer as HTMLDivElement).offsetHeight + collapseCreditHeight.current.offsetHeight}px`;
		}
	};

	const onPayPalModeChange = (): void => {
		setPaymentMode(PAYPAL);

		if (collapseCreditHeight.current && collapseCreditHeight.current.parentElement) {
			collapseCreditHeight.current.parentElement.style.height = '97px';
		}
	};

	const savePaymentDetails = (): void => {
		const isChanged = Object.keys(field).some(key => field[key].value !== payment.data[key]) || paymentMode !== payment.type;

		if (isChanged) {
			dispatch(setPaymentDetails({
				type: paymentMode,
				data: {
					name: field.name.value,
					cardnumber: field.cardnumber.value,
					expiry: field.expiry.value,
					ccv: field.ccv.value
				}
			}));
		}
	};

	const onConfirm = (e: React.FormEvent<HTMLInputElement>): void => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast
		// check  that each field is not empty and the errors empty.
		const noError = Object.keys(field).every(key => field[key].value !== '' && (field[key].error === '' || field[key].error === undefined));

		if (!paymentMode) return;
		if (paymentMode === CREDIT) {
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

	const onClickBack = (): void => {
		savePaymentDetails();
		history.push(Route.CHECKOUT_STEP_2);
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
						} as any}
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
						nextStepLabel="Confirm"
						onClickNext={onConfirm}
						onClickPrevious={onClickBack}
					/>
				</div>
			</div>
		);
};

export default withAuth(Payment);
