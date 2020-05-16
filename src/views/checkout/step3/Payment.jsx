import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../hoc/withAuth';
import CheckOutHeader from '../header/CheckOutHeader';
import useFieldHandler from 'hooks/useFieldHandler';

import { displayMoney, displayActionMessage } from 'helpers/utils';

const Payment = ({ shipping, subtotal, history }) => {
  const { field, setField, onFieldChange, errorField, setErrorField } = useFieldHandler({
    name: '',
    cardnumber: '',
    expiry: '',
    ccv: ''
  });
  const [paymentMode, setPaymentMode] = useState('paypal');
  const collapseCreditHeight = useRef(null);
  const cardInputRef = useRef(null);

  const onCreditModeChange = (e) => {
    setPaymentMode('credit');
    const parent = e.target.closest('.checkout-fieldset-collapse');
    const checkBoxContainer = e.target.closest('.checkout-checkbox-field');

    cardInputRef.current.focus();
    parent.style.height = checkBoxContainer.offsetHeight + collapseCreditHeight.current.offsetHeight + 'px';
  };

  const onPayPalModeChange = () => {
    setPaymentMode('paypal');
    collapseCreditHeight.current.parentElement.style.height = '97px';
  };

  const onCardNameInput = (e) => onFieldChange(e, 'name', false);

  const onCardNumberInput = (e) => {
    const val = e.target.value.trim();

    onFieldChange(e, 'cardnumber', false);

   if (!(val.length >= 13 && val.length <= 19)) {
      setErrorField({ ...errorField, cardnumber: 'Card number is invalid' });
    } 
  };

  const onExpiryInput = (e) => onFieldChange(e, 'expiry', false);

  const onCcvInput = (e) => {
    onFieldChange(e, 'ccv', false);

    if (e.target.value.trim().length < 3) {
      setErrorField({ ...errorField, ccv: 'CCV is invalid' });
    }
  };

  const errorClassName = (field) => {
    return errorField[field] ? 'input-error' : '';
  };

  const onConfirm = (e) => {
    e.preventDefault();

    if (!paymentMode) return;
    if (paymentMode === 'credit') {
      const ready = Object.keys(field).every(key => field[key] !== '') 
        && Object.keys(errorField).every(key => errorField[key] === '');
      
      if (ready) {
        displayActionMessage('Feature not ready yet :)', 'info');
      } else {
        displayActionMessage('All credentials for credit payment required!', 'error');
      }
    } else {
      displayActionMessage('Feature not ready yet :)', 'info');
    }

  }

  return !shipping.isDone ? <Redirect to="/checkout/step1" />
   : (
    <div className="checkout">
      <CheckOutHeader current={3}/>
      <form className="checkout-step-3" onSubmit={onConfirm}>
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
            <br/>
            <div className="checkout-field margin-0">
              <div className="checkout-fieldset">
                <div className="checkout-field">
                  {errorField.name ? <span className="input-message">{errorField.name}</span> : (
                    <span className="d-block padding-s">Name on Card</span>
                  )}
                  <input 
                      className={`input-form d-block ${errorClassName('name')}`}
                      onChange={onCardNameInput}
                      placeholder="Jane Doe"
                      ref={cardInputRef}
                      style={{ textTransform: 'capitalize' }}
                      type="text"
                      value={field.name}
                  />
                </div>
                <div className="checkout-field">
                  {errorField.cardnumber ? <span className="input-message">{errorField.cardnumber}</span> : (
                    <span className="d-block padding-s">Card Number</span>
                  )}
                  <input 
                      className={`input-form d-block ${errorClassName('cardnumber')}`}
                      maxLength={19}
                      onChange={onCardNumberInput}
                      placeholder="Card Number"
                      type="number"
                      value={field.cardnumber}
                  />
                </div>
              </div>
              <div className="checkout-fieldset">
                <div className="checkout-field">
                  {errorField.expiry ? <span className="input-message">{errorField.expiry}</span> : (
                    <span className="d-block padding-s">Expiry Date</span>
                  )}
                  <input 
                      className={`input-form d-block ${errorClassName('expiry')}`}
                      onChange={onExpiryInput}
                      placeholder="Expiry Date"
                      type="date"
                      value={field.expiry}
                  />
                </div>
                <div className="checkout-field">
                  {errorField.ccv ? <span className="input-message">{errorField.ccv}</span> : (
                    <span className="d-block padding-s">CCV Number</span>
                  )}
                  <input 
                      className={`input-form d-block ${errorClassName('ccv')}`}
                      maxLength={4}
                      onChange={onCcvInput}
                      placeholder="CCV Number"
                      type="number"
                      value={field.ccv}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className={`checkout-fieldset-collapse ${paymentMode === 'paypal' ? 'is-selected-payment' : ''}`}>
          <div className="checkout-field margin-0">
            <div className="checkout-checkbox-field">
              <input 
                  className=""
                  checked={paymentMode === 'paypal'}
                  id="payment-paypal-checkbox"
                  name="checkout_payment"
                  onChange={onPayPalModeChange}
                  type="radio"
              />
              <label className="d-flex w-100" htmlFor="payment-paypal-checkbox">
                <div className="d-flex-grow-1 margin-left-s">
                  <h4 className="margin-0">PayPal</h4>
                  <span className="text-subtle d-block margin-top-s">
                    Pay easily, fast and secure with PayPal.
                  </span>
                </div>
                <div className="payment-img payment-img-paypal" />
              </label>
            </div>
          </div>
        </div>
        <br/>
        <div className="basket-total text-right">
          <p className="basket-total-title">Total:</p>
          <h2 className="basket-total-amount">{displayMoney(subtotal + (shipping.isInternational ? 50 : 0))}</h2>
        </div>
        <br/>
        <div className="checkout-shipping-action padding-0">
          <button 
              className="button button-muted checkout-shipping-back"
              onClick={() => history.push('/checkout/step2')}
              type="button"
          >
            Back
          </button>
          <button 
              className="button"
              disabled={!!!paymentMode}
              type="submit"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(Payment);
