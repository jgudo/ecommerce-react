import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Input from 'components/ui/Input';

const ShippingForm = ({ setField, field }) => {
	const [errorMobile, setErrorMobile] = useState('');

	const onFullNameInput = (value, error) => {
		setField({ ...field, fullname: { value, error } });
	};

	const onEmailInput = (value, error) => {
		setField({ ...field, email: { value, error } });
	};

	const onAddressInput = (value, error) => {
		setField({ ...field, address: { value, error } });
	};

	const onMobileInput = (value, data) => {
		const obj = {
			dialCode: data.dialCode,
			countryCode: data.countryCode,
			num: value
		};

		if (value.length === 0) {
			setErrorMobile('Mobile number is required.');
		} else {
			setErrorMobile('');
		}

		setField({
			...field,
			mobile: {
				value: value.replace(/[^0-9]+/g, '').slice(data.dialCode.length),
				error: errorMobile,
				data: obj
			}
		});
	};

	const errorClassName = () => {
		return errorMobile ? 'input-error' : '';
	};

	const onShippingOptionChange = () => setField({ ...field, isInternational: !field.isInternational });

	return (
		<div className="checkout-shipping-wrapper">
			<div className="checkout-shipping-form">
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="fullname"
							isRequired
							label="* Full Name"
							maxLength={40}
							onInputChange={onFullNameInput}
							placeholder="Your Full Name"
							style={{ textTransform: 'capitalize' }}
							type="text"
							value={field.fullname.value}
						/>
					</div>
					<div className="d-block checkout-field">
						<Input
							field="email"
							isRequired
							label="* Email"
							maxLength={40}
							onInputChange={onEmailInput}
							placeholder="Your Email"
							type="email"
							value={field.email.value}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="address"
							isRequired
							label="* Shipping Address"
							maxLength={120}
							onInputChange={onAddressInput}
							placeholder="Full Shipping Address"
							type="text"
							value={field.address.value}
						/>
					</div>
					<div className="d-block checkout-field">
						{errorMobile ? <span className="input-message">{errorMobile}</span> : (
							<span className="d-block padding-s">* Mobile Number</span>
						)}
						<PhoneInput
							country={'ph'}
							inputClass={`input-form d-block ${errorClassName('mobile')}`}
							inputExtraProps={{ required: true }}
							// eslint-disable-next-line quote-props
							masks={{ 'ph': '+.. .... ... ....' }}
							onChange={onMobileInput}
							placeholder="09264538861"
							value={field.mobile.data.num}
						/>
					</div>
				</div>
				<div className="checkout-fieldset">
					<div className="checkout-field">
						<span className="d-block padding-s">Shipping Option</span>
						<div className="checkout-checkbox-field">
							<input
								checked={field.isInternational}
								className=""
								id="shipping-option-checkbox"
								onChange={onShippingOptionChange}
								type="checkbox"
							/>
							<label className="d-flex w-100" htmlFor="shipping-option-checkbox">
								<h5 className="d-flex-grow-1 margin-0">
									&nbsp; International Shipping &nbsp;
									<span className="text-subtle">7-14 days</span>
								</h5>
								<h4 className="margin-0">$50.00</h4>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShippingForm;
