/* eslint-disable no-else-return */
import { CustomInput } from 'components/formik';
import { Field, useFormikContext } from 'formik';
import React from 'react';

const CreditPayment = React.forwardRef(({ paymentMode, }, ref) => {
	const { cardInputRef, collapseCreditHeight } = ref;
	const { values, setValues } = useFormikContext();

	const onCreditModeChange = (e) => {
		if (e.target.checked) {
			setValues({ ...values, paymentMode: 'credit' });

			const parent = e.target.closest('.checkout-fieldset-collapse');
			const checkBoxContainer = e.target.closest('.checkout-checkbox-field');

			cardInputRef.current.focus();
			parent.style.height = `${checkBoxContainer.offsetHeight + collapseCreditHeight.current.offsetHeight}px`;
		}
	};

	return (
		<>
			<h3 className="text-center">Payment</h3>
			<br />
			<span className="d-block padding-s">Payment Option</span>
			<div className={`checkout-fieldset-collapse ${paymentMode === 'credit' ? 'is-selected-payment' : ''}`}>
				{/* ---- CHECKBOX TOGGLER ------ */}
				<div className="checkout-field margin-0">
					<div className="checkout-checkbox-field">
						<input
							checked={values.paymentMode === 'credit'}
							id="modeCredit"
							name="paymentMode"
							onChange={onCreditModeChange}
							type="radio"
						/>
						<label className="d-flex w-100" htmlFor="modeCredit">
							<div className="d-flex-grow-1 margin-left-s">
								<h4 className="margin-0">Credit Card</h4>
								<span className="text-subtle d-block margin-top-s">
									Pay with Visa, Master Card and other debit or credit card
											</span>
							</div>
							<div className="d-flex">
								<div className="payment-img payment-img-visa" />
								&nbsp;
								<div className="payment-img payment-img-mastercard" />
							</div>
						</label>
					</div>
				</div>
				<div className="checkout-collapse-sub" ref={collapseCreditHeight}>
					<span className="d-block padding-s text-center">Accepted Cards</span>
					<div className="checkout-cards-accepted d-flex-center">
						<div className="payment-img payment-img-visa" title="Visa" />
						<div className="payment-img payment-img-express" title="American Express" />
						<div className="payment-img payment-img-mastercard" title="Master Card" />
						<div className="payment-img payment-img-maestro" title="Maestro" />
						<div className="payment-img payment-img-discover" title="Discover" />
					</div>
					<br />
					<div className="checkout-field margin-0">
						<div className="checkout-fieldset">
							<div className="checkout-field">
								<Field
									name="name"
									type="text"
									label="* Name on Card"
									placeholder="Jane Doe"
									component={CustomInput}
									style={{ textTransform: 'capitalize' }}
									inputRef={cardInputRef}
								/>
							</div>
							<div className="checkout-field">
								<Field
									name="cardnumber"
									type="number"
									label="* Card Number"
									placeholder="Enter your card number"
									component={CustomInput}
								/>
							</div>
						</div>
						<div className="checkout-fieldset">
							<div className="checkout-field">
								<Field
									name="expiry"
									type="date"
									label="* Expiry Date"
									placeholder="Enter your expiry date"
									component={CustomInput}
								/>
							</div>
							<div className="checkout-field">
								<Field
									name="ccv"
									type="number"
									label="* CCV"
									placeholder="****"
									component={CustomInput}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
});

export default CreditPayment;
