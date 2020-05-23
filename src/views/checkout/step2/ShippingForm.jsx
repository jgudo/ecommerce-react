import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Input from 'components/ui/Input';

import { displayMoney } from 'helpers/utils';

const ShippingForm = ({
  setField,
  field,
  profile, 
  shipping, 
  subtotal, 
  history 
}) => {
  const [errorMobile, setErrorMobile] = useState('');

  const onFullNameInput = (e, value, error) => {
    setField({ ...field, fullname: { value, error } })
  };

  const onEmailInput = (e, value, error) => {
    setField({ ...field, email: { value, error } })
  };

  const onAddressInput = (e, value, error) => {
    setField({ ...field, address: { value, error } })
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
        value: value.replace(/[^0-9]+/g,'').slice(data.dialCode.length), 
        error: errorMobile, 
        data: obj 
      } 
    });
  };

  const errorClassName = (key) =>  errorMobile ? 'input-error' : '';

  const onShippingOptionChange = (e) => setField({ ...field, isInternational: !field.isInternational });

  return (
    <div className="checkout-shipping-wrapper">
      <div className="checkout-shipping-form">
        <div className="checkout-fieldset">
          <div className="d-block checkout-field">
            <Input 
                label="* Full Name"
                maxLength={40}
                placeholder="Your Full Name"
                onInputChange={onFullNameInput}
                isRequired={true}
                field="fullname"
                style={{ textTransform: 'capitalize' }}
                type="text"
                value={field.fullname.value}
            />
          </div>
          <div className="d-block checkout-field">
            <Input 
                label="* Email"
                maxLength={40}
                placeholder="Your Email"
                onInputChange={onEmailInput}
                isRequired={true}
                field="email"
                type="email"
                value={field.email.value}
            />
          </div>
        </div>
        <div className="checkout-fieldset">
          <div className="d-block checkout-field">
            <Input 
                label="* Shipping Address"
                maxLength={120}
                placeholder="Full Shipping Address"
                onInputChange={onAddressInput}
                isRequired={true}
                field="address"
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
                inputExtraProps={{ required: true }}
                inputClass={`input-form d-block ${errorClassName('mobile')}`}
                masks={{'ph': '+.. .... ... ....'}}
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
                  className=""
                  checked={field.isInternational}
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
