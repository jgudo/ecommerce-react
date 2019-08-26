import React from 'react';
import BasketItem from '../../../components/basket/BasketItem';
import CheckOutHeader from '../header/CheckOutHeader';
import withAuth from '../hoc/withAuth';
import { removeFromBasket, clearBasket, addQtyItem, minusQtyItem } from '../../../actions/basketActions';
import { displayMoney } from '../../../helpers/utils';

const OrderSummary = (props) => {
  const { basket, dispatch } = props;

  const calculateTotal = () => {
    let total = 0;

    if (basket.length !== 0) {
      const result = basket.map(product => product.price * product.quantity).reduce((a, b) => a + b);
      total = result.toFixed(2);
    }

    return displayMoney(total);
  };

  const onContinue = () => {
    props.history.push('/checkout/step2');
  };

  return (
    <div className="checkout">
      <CheckOutHeader current={1}/>
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
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
        <div className="checkout-action">
          <div className="basket-total">
            <p className="basket-total-title">Subtotal:</p>
            <h2 className="basket-total-amount">{calculateTotal()}</h2>
          </div>
          <br/>
          <button 
              className="button"
              onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(OrderSummary);
