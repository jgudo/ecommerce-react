import { CHECKOUT_STEP_2 } from 'constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage, displayMoney } from 'helpers/utils';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { setPaymentDetails } from 'redux/actions/checkoutActions';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withAuth from '../hoc/withAuth';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';

const FormSchema = Yup.object().shape({
	name: Yup.string()
		.min(4, 'Name should be at least 4 characters.')
		.required('Name is required'),
	cardnumber: Yup.number()
		.positive('Card number is invalid.')
		.integer('Card number should be an integer.')
		.required('Card number is required.'),
	expiry: Yup.date()
		.required('Credit card expiry is required.'),
	ccv: Yup.number()
		.positive('CCV is invalid.')
		.integer('CCV should be an integer.')
		.required('CCV is required.'),
	paymentMode: Yup.string().required('Please select paymend mode')
});

const Payment = ({ shipping, payment, subtotal }) => {
	useDocumentTitle('Check Out Final Step | Salinaka');
	useScrollTop();
	const dispatch = useDispatch();
	const history = useHistory();

	const collapseCreditHeight = useRef(null);
	const cardInputRef = useRef(null);
	const [field, setField] = useState({
		name: { value: payment.data.name ? payment.data.name : '' },
		cardnumber: { value: payment.data.cardnumber ? payment.data.cardnumber : '' },
		expiry: { value: payment.data.expiry ? payment.data.expiry : '' },
		ccv: { value: payment.data.ccv ? payment.data.ccv : '' }
	});

	const initFormikValues = {
		name: payment.data.name || '',
		cardnumber: payment.data.cardnumber || '',
		expiry: payment.data.expiry || '',
		ccv: payment.data.ccv || '',
		paymentMode: payment.type || 'paypal'
	}

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
				<Formik
					initialValues={initFormikValues}
					validateOnChange
					validationSchema={FormSchema}
					onSubmit={onConfirm}
				>
					<Form className="checkout-step-3">
						<CreditPayment
							paymentMode={payment.type}
							ref={{
								cardInputRef,
								collapseCreditHeight
							}}
						/>
						<PayPalPayment
							onPayPalModeChange={onPayPalModeChange}
							paymentMode={payment.type}
						/>
						<br />
						<div className="basket-total text-right">
							<p className="basket-total-title">Total:</p>
							<h2 className="basket-total-amount">{displayMoney(subtotal + (shipping.isInternational ? 50 : 0))}</h2>
						</div>
						<br />
						<div className="checkout-shipping-action">
							<button
								className="button button-muted"
								onClick={onClickBack}
								type="button"
							>
								Go Back
						</button>
							<button
								className="button"
								disabled={true}
								type="submit"
							>
								Confirm
						</button>
						</div>
					</Form>
				</Formik>
			</div>
		);
};

export default withAuth(Payment);
