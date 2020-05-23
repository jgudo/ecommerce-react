import React from 'react';
import BasketItem from 'components/basket/BasketItem';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import withAuth from '../hoc/withAuth';
import { displayMoney } from 'helpers/utils';

const OrderSummary = ({ basket, subtotal, dispatch, history }) => {
  const onClickPrevious = () => history.push('/');
  const onClickNext = () => history.push('/checkout/step2');

  return (
    <div className="checkout">
      <StepTracker current={1}/>
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">Review items in your basket.</span>
        <br/>
        {basket.map(product => (
          <BasketItem 
              key={product.id}
              product={product}
              basket={basket}
              dispatch={dispatch}
          />
        ))}
        <br/>
        <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
        </div>
        <br/>
        <Pagination 
            history={history}
            disabledNext={false}
            previousLabel="Continue Shopping"
            onClickPrevious={onClickPrevious}
            onClickNext={onClickNext}

        />
      </div>
    </div>
  );
};

export default withAuth(OrderSummary);
