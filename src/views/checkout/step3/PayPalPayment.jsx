import { useFormikContext } from 'formik';
import React from 'react';

const PayPalPayment = () => {
  const { values, setValues } = useFormikContext();

  return (
    <div className={`checkout-fieldset-collapse ${values.type === 'paypal' ? 'is-selected-payment' : ''}`}>
      <div className="checkout-field margin-0">
        <div className="checkout-checkbox-field">
          <label
            className="d-flex w-100"
            htmlFor="modePayPal"
          >
            <input
              checked={values.type === 'paypal'}
              id="modePayPal"
              name="type"
              onChange={(e) => {
                if (e.target.checked) {
                  setValues({ ...values, type: 'paypal' });
                }
              }}
              type="radio"
            />
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
