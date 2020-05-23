import React from 'react';

const PayPalPayment = ({ paymentMode, onPayPalModeChange }) => {
	return (
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
	);
};

export default PayPalPayment;
