import React, { useState } from 'react';
import withAuth from '../hoc/withAuth';
import ReactPhoneInput from 'react-phone-input-2';
import CheckOutHeader from '../header/CheckOutHeader';

import { displayMoney } from '../../../helpers/utils';
import { setShippingDetails } from '../../../actions/checkoutActions';

const ShippingDetails = (props) => {
  const { profile, dispatch, shipping, subtotal } = props;
  const [field, setField] = useState({
    fullname: profile.fullname ? profile.fullname : '',
    email: profile.email ? profile.email : '',
    address: profile.address ? profile.address : shipping.address ? shipping.address : '',
    mobile: profile.mobile ? profile.mobile : shipping.mobile ? shipping.mobile : '',
    isInternational: !!shipping.isInternational ? shipping.isInternational : false,
    isDone: false
  });
  const [error, setError] = useState({});

  const onFullNameInput = (e) => {
    const val = e.target.value.trimStart();
    const regex = /[^a-zA-Z\s]/gi;

    setField({ ...field, fullname: val });

    if (val === '') {
      setError({ ...error, fullname: 'Full name is required' });
    } else if (regex.test(val)) {
      setError({ ...error, fullname: 'Full name contains invalid characters' });
    } else if (val.length < 6) {
      setError({ ...error, fullname: 'Full name must be at least 6 characters' });
    } else {
      setError({ ...error, fullname: '' });
    }
  };

  const onEmailInput = (e) => {
    const val = e.target.value.trim();
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    setField({ ...field, email: val });

    if (val === '') {
      setError({ ...error, email: 'Email is required' });
    } else if (!regex.test(val)) {
      setError({ ...error, email: 'Email is invalid' });
    } else {
      setError({ ...error, email: '' });
    }
  };

  const onAddressInput = (e) => {
    const val = e.target.value.trimStart();

    setField({ ...field, address: val });

    if (val === '') {
      setError({ ...error, address: 'Address is required' });
    } else {
      setError({ ...error, address: '' });
    }
  };

  const onMobileInput = (mob, data) => {
    const mobile = mob.replace(/[^0-9]+/g,'').slice(data.dialCode.length);
    const len = mobile.toString().length;
    setField({ ...field, mobile});

    if (!field.mobile) {
      setError({ ...error, mobile: 'Mobile number is required' });
    } else if (len <= 9) {
      setError({ ...error, mobile: 'Mobile number invalid' });
    }else {
      setError({ ...error, mobile: '' });
    }
  };

  const errorClassName = (field) => {
    return error[field] ? 'input-error' : '';
  };

  const onShippingOptionChange = (e) => {
    if (e.target.checked) {
      setField({ ...field, isInternational: true });
    } else {
      setField({ ...field, isInternational: false });
    }
  };

  const onClickNext = () => {
    const clear = Object.keys(error).every(key => error[key] === '') 
      && Object.keys(field).every(key => field[key] !== '');

    if (clear) {
      dispatch(setShippingDetails({ ...field, isDone: true }));
      props.history.push('/checkout/step3');
    }
  };

  return (
    <div className="checkout">
      <CheckOutHeader current={2}/>
      <div className="checkout-step-2">
        <h3 className="text-center">
          Shipping Details
        </h3>
        <div className="checkout-shipping-wrapper">
          <div className="checkout-shipping-form">
            <div className="checkout-fieldset">
              <div className="d-block checkout-field">
                {error.fullname ? <span className="input-message">{error.fullname}</span> : (
                  <span className="d-block padding-s">Full Name</span>
                )}
                <input 
                    className={`input-form d-block ${errorClassName('fullname')}`}
                    onChange={onFullNameInput}
                    placeholder="Your full name"
                    style={{ textTransform: 'capitalize' }}
                    type="text"
                    value={field.fullname}
                />
              </div>
              <div className="d-block checkout-field">
                {error.email && <span className="input-message">{error.email}</span>}
                <span className="d-block padding-s">Email</span>
                <input 
                    className={`input-form d-block ${errorClassName('email')}`}
                    onChange={onEmailInput}
                    placeholder="Your email"
                    type="email"
                    value={field.email}
                />
              </div>
            </div>
            <div className="checkout-fieldset">
              <div className="d-block checkout-field">
                {error.address ? <span className="input-message">{error.address}</span> : (
                  <span className="d-block padding-s">Address</span>
                )}
                <input 
                    className={`input-form d-block ${errorClassName('address')}`}
                    onChange={onAddressInput}
                    placeholder="Complete Address"
                    type="text"
                    value={field.address}
                />
              </div>
              <div className="d-block checkout-field">
                {error.mobile ? <span className="input-message">{error.mobile}</span> : (
                  <span className="d-block padding-s">Mobile Number</span>
                )}
                <ReactPhoneInput 
                    defaultCountry={'ph'} 
                    inputExtraProps={{ required: true }}
                    inputClass={`input-form d-block ${errorClassName('mobile')}`}
                    masks={{'ph': '+.. .... ... ....'}}
                    onChange={onMobileInput}
                    placeholder="09264538861"
                    value={field.mobile} 
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
            <br/>
            <div className="checkout-total d-flex-end padding-right-m">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span className="d-block margin-0 padding-right-s text-right">International Shipping: &nbsp;</span>
                    </td>
                    <td>
                      <h4 className="basket-total-amount text-subtle text-right margin-0 ">{field.isInternational ? '$50.00' : '$0.00'}</h4>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="d-block margin-0 padding-right-s text-right">Subtotal: &nbsp;</span>
                    </td>
                    <td>
                      <h4 className="basket-total-amount text-subtle text-right margin-0">{displayMoney(subtotal)}</h4>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="d-block margin-0 padding-right-s text-right">Total: &nbsp;</span>
                    </td>
                    <td>
                      <h2 className="basket-total-amount text-right">
                        {displayMoney(subtotal + (field.isInternational ? 50 : 0))}
                      </h2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br/>
            <div className="checkout-shipping-action">
              <button 
                  className="button button-muted checkout-shipping-back"
                  onClick={() => props.history.push('/checkout/step1')}
                  type="button"
              >
                Back
              </button>
              <button 
                  className="button checkout-shipping-back"
                  disabled={!(Object.keys(error).every(key => error[key] === '') 
                            && Object.keys(field).every(key => field[key] !== ''))}
                  onClick={onClickNext}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ShippingDetails);
