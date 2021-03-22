import { ArrowRightOutlined, ShopOutlined } from '@ant-design/icons';
import { BasketItem } from 'components/basket';
import { CHECKOUT_STEP_2 } from 'constants/routes';
import { displayMoney } from 'helpers/utils';
import { useDocumentTitle, useScrollTop } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';

const OrderSummary = ({ basket, subtotal }) => {
  useDocumentTitle('Check Out Step 1 | Salinaka');
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickPrevious = () => history.push('/');
  const onClickNext = () => history.push(CHECKOUT_STEP_2);

  return (
    <div className="checkout">
      <StepTracker current={1} />
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">Review items in your basket.</span>
        <br />
        <div className="checkout-items">
          {basket.map((product) => (
            <BasketItem
              basket={basket}
              dispatch={dispatch}
              key={product.id}
              product={product}
            />
          ))}
        </div>
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
        </div>
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={onClickPrevious}
            type="button"
          >
            <ShopOutlined />
            &nbsp;
            Continue Shopping
          </button>
          <button
            className="button"
            onClick={onClickNext}
            type="submit"
          >
            Next Step
            &nbsp;
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  basket: PropType.arrayOf(PropType.object).isRequired,
  subtotal: PropType.number.isRequired
};

export default withCheckout(OrderSummary);
