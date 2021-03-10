/* eslint-disable no-else-return */
import { CustomInput } from 'components/formik';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';

const CreditPayment = (props) => {
	const { values, setValues } = useFormikContext();
	const collapseContainerRef = useRef(null);
	const cardInputRef = useRef(null);
	const containerRef = useRef(null);
	const checkboxContainerRef = useRef(null);

	useEffect(() => {
		toggleCollapse();
	}, [values.type]);

	const toggleCollapse = () => {
		const cn = containerRef.current;
		const cb = checkboxContainerRef.current;
		const cl = collapseContainerRef.current;

		if (cb && cn && cl) {
			if (values.type === 'credit') {
				cardInputRef.current.focus();
				cn.style.height = `${cb.offsetHeight + cl.offsetHeight}px`;
			} else {
				cardInputRef.current.blur();
				cn.style.height = `${cb.offsetHeight}px`;
			}
		}
	}

	const onCreditModeChange = (e) => {
		if (e.target.checked) {
			setValues({ ...values, type: 'credit' });
			toggleCollapse();
		}
	};

	const handleOnlyNumberInput = (e) => {
		const key = e.nativeEvent.key;
		if (/\D/.test(key) && key !== 'Backspace') {
			e.preventDefault();
		}
	};

	return (
		<>
			<h3 className="text-center">Payment</h3>
			<br />
			<span className="d-block padding-s">Payment Option</span>
			<div ref={containerRef} className={`checkout-fieldset-collapse ${values.type === 'credit' ? 'is-selected-payment' : ''}`}>
				{/* ---- CHECKBOX TOGGLER ------ */}
				<div className="checkout-field margin-0">
					<div className="checkout-checkbox-field" ref={checkboxContainerRef}>
						<input
							checked={values.type === 'credit'}
							id="modeCredit"
							name="type" // the field name in formik I used is type 
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
				<div className="checkout-collapse-sub" ref={collapseContainerRef}>
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
									type="text"
									maxLength={19}
									onKeyDown={handleOnlyNumberInput}
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
									type="text"
									maxLength={4}
									onKeyDown={handleOnlyNumberInput}
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
};

export default CreditPayment;
