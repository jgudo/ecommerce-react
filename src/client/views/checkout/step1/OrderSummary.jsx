import React from 'react';
import BasketItem from '../../../components/basket/BasketItem';
import CheckOutHeader from '../header/CheckOutHeader';
import withAuth from '../hoc/withAuth';
import { removeFromBasket, clearBasket, addQtyItem, minusQtyItem } from '../../../actions/basketActions';
import { displayMoney } from '../../../helpers/utils';

const OrderSummary = ({ basket, subtotal, dispatch, history }) => {
  const onContinue = () => {
    history.push('/');
  };

  const onNext = () => {
    history.push('/checkout/step2');
  };

  return (
    <div className="checkout">
      <CheckOutHeader current={1}/>
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">Review items in your basket.</span>
        <br/>
        {basket.map(product => (
          <BasketItem 
              key={product.id}
              product={product}
              basket={basket}
              action={{
                removeFromBasket: id => dispatch(removeFromBasket(id)),
                clearBasket: () => dispatch(clearBasket()),
                addQtyItem: id => dispatch(addQtyItem(id)),
                minusQtyItem: id => dispatch(minusQtyItem(id))
              }}
          />
        ))}
        <br/>
        <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
        </div>
        <br/>
        <div className="checkout-shipping-action padding-0">
          <button 
              className="button button-muted"
              onClick={onContinue}
          >
            Continue Shopping
          </button>
          <br/>
          <button 
              className="button"
              onClick={onNext}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(OrderSummary);
