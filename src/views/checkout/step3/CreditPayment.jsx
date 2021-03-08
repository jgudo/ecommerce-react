/* eslint-disable no-else-return */
import { Input } from 'components/common';
import React from 'react';

const CreditPayment = React.forwardRef(({
	onCreditModeChange,
	paymentMode,
	setField,
	field
}, ref) => {
	const { cardInputRef, collapseCreditHeight } = ref;

	const onCardNameInput = (value, error) => {
		setField({ ...field, name: { value, error } });
	};

	const onCardNumberInput = (value, error) => {
		setField({ ...field, cardnumber: { value, error } });
	};

	const validateCardNumber = (value) => {
		if (!(value.length >= 13 && value.length <= 19)) {
			return 'Card number is invalid';
		} else {
			return false;
		}
	};

	const onExpiryInput = (value, error) => {
		setField({ ...field, expiry: { value, error } });
	};

	const onCcvInput = (value, error) => {
		setField({ ...field, ccv: { value, error } });
	};

	const validateCCV = (value) => {
		// do some stuffs
		if (value.trim().length < 3) {
			return 'CCV is invalid';
		} else {
			return false;
		}
	};

	return (
		<form>
			<h3 className="text-center">Payment</h3>
			<br />
			<span className="d-block padding-s">Payment Option</span>
			<div className={`checkout-fieldset-collapse ${paymentMode === 'credit' ? 'is-selected-payment' : ''}`}>
				<div className="checkout-field margin-0">
					<div className="checkout-checkbox-field">
						<input
							checked={paymentMode === 'credit'}
							className=""
							id="payment-credit-checkbox"
							name="checkout_payment"
							onChange={onCreditModeChange}
							type="radio"
						/>
						<label className="d-flex w-100" htmlFor="payment-credit-checkbox">
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
								<Input
									field="name"
									isRequired
									label="* Name on Card"
									maxLength={40}
									onInputChange={onCardNameInput}
									placeholder="Jane Doe"
									ref={cardInputRef}
									style={{ textTransform: 'capitalize' }}
									type="text"
									value={field.name.value}
								/>
							</div>
							<div className="checkout-field">
								<Input
									field="cardnumber"
									isRequired
									label="* Card Number"
									onInputChange={onCardNumberInput}
									placeholder="Card Number"
									type="number"
									validate={validateCardNumber}
									value={field.cardnumber.value}
								/>
							</div>
						</div>
						<div className="checkout-fieldset">
							<div className="checkout-field">
								<Input
									label="* Expiry Date"
									placeholder="Expiry Date"
									onInputChange={onExpiryInput}
									isRequired={true}
									field="expiry"
									type="date"
									value={field.expiry.value}
								/>
							</div>
							<div className="checkout-field">
								<Input
									field="ccv"
									isRequired
									label="* CCV Number"
									maxLength={4}
									onInputChange={onCcvInput}
									placeholder="CCV Number"
									type="number"
									validate={validateCCV}
									value={field.ccv.value}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
});

export default CreditPayment;
