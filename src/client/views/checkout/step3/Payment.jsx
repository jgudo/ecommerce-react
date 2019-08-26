import React, { useState, useRef } from 'react';
import withAuth from '../hoc/withAuth';
import CheckOutHeader from '../header/CheckOutHeader';

const Payment = (props) => {
  const [field, setField] = useState({});
  const [error, setError] = useState({});
  const [paymentMode, setPaymentMode] = useState(null);
  const collapseCreditHeight = useRef(null);
    
  const onCreditModeChange = (e) => {
    setPaymentMode('credit');
    const parent = e.target.closest('.checkout-fieldset-collapse');
    const checkBoxContainer = e.target.closest('.checkout-checkbox-field');

    parent.style.height = checkBoxContainer.offsetHeight + collapseCreditHeight.current.offsetHeight + 'px';
  };

  const onPayPalModeChange = () => {
    setPaymentMode('paypal');
    collapseCreditHeight.current.parentElement.style.height = '97px';
  };

  const errorClassName = (field) => {
    return error[field] ? 'input-error' : '';
  };

  return (
    <div className="checkout">
      <CheckOutHeader current={3}/>
      <form className="checkout-step-3">
        <h3 className="text-center">Payment</h3>
        <br/>
        <span className="d-block padding-s">Payment Option</span>
        <div className={`checkout-fieldset-collapse ${paymentMode === 'credit' ? 'is-selected-payment' : ''}`}>
          <div className="checkout-field margin-0">
            <div className="checkout-checkbox-field">
              <input 
                  className=""
                  id="payment-credit-checkbox"
                  name="checkout_payment"
                  onChange={onCreditModeChange}
                  type="radio"
              />
              <label className="d-flex w-100" htmlFor="payment-credit-checkbox">
                <div className="d-flex-grow-1 margin-left-s">
                  <h5 className="margin-0">Credit Card</h5>
                  <span className="text-subtle d-block margin-top-s">
                    Pay with Visa, Master Card and other debit or credit card
                  </span>
                </div>
              </label>
            </div>
          </div>
          <div className="checkout-collapse-sub" ref={collapseCreditHeight}>
            <div className="checkout-field margin-0">
              <span className="d-block padding-s">Name on Card</span>
              <input 
                  className={`input-form d-block ${errorClassName('name')}`}
                  placeholder="Your name on card"
                  type="text"
                  // value={field.mobile}
              />
              <span className="d-block padding-s">Card Number</span>
              <input 
                  className={`input-form d-block ${errorClassName('cardnumber')}`}
                  placeholder="Card Number"
                  type="number"
                  // value={field.mobile}
              />
              <span className="d-block padding-s">Expiry Date</span>
              <input 
                  className={`input-form d-block ${errorClassName('expiry')}`}
                  placeholder="Expiry Date"
                  type="date"
                  // value={field.mobile}
              />
              <span className="d-block padding-s">CCV Number</span>
              <input 
                  className={`input-form d-block ${errorClassName('ccv')}`}
                  placeholder="CCV Number"
                  type="number"
                  // value={field.mobile}
              />
            </div>
          </div>
        </div>
        <br/>
        <div className={`checkout-fieldset-collapse ${paymentMode === 'paypal' ? 'is-selected-payment' : ''}`}>
          <div className="checkout-field margin-0">
            <div className="checkout-checkbox-field">
              <input 
                  className=""
                  id="payment-paypal-checkbox"
                  name="checkout_payment"
                  onChange={onPayPalModeChange}
                  type="radio"
              />
              <label className="d-flex w-100" htmlFor="payment-paypal-checkbox">
                <div className="d-flex-grow-1 margin-left-s">
                  <h5 className="margin-0">PayPal</h5>
                  <span className="text-subtle d-block margin-top-s">
                    Pay easily, fast and secure with PayPal.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="checkout-shipping-action">
          <button 
              className="button button-muted checkout-shipping-back"
              onClick={() => props.history.push('/checkout/step2')}
              type="button"
          >
            Back
          </button>
          <button 
              className="button checkout-shipping-back"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(Payment);
