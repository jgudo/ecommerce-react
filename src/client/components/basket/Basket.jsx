import React from 'react';
import { connect } from 'react-redux';
import { removeFromBasket } from '../../actions/basketActions';
import BasketItem from './BasketItem';
import BasketToggle from './BasketToggle';
import Button from '../ui/Button';

import { displayMoney } from '../../helpers/utils';

const Basket = ({ basket, dispatchRemoveFromBasket }) => {
  return (
    <div className="basket">
      <div className="basket-list">
        <div className="basket-header">
          <h3 className="basket-header-title">My Basket</h3>
          <BasketToggle>
            {({ onClickToggle }) => (
              <span 
                  className="basket-toggle button button-border button-border-gray button-small" 
                  onClick={onClickToggle}
              >
                Close
              </span>
            )}
          </BasketToggle>
          <Button
              className="basket-clear button button-border button-border-gray button-small"
          >
            <span>Clear Basket</span>
          </Button>
        </div>
        {basket.map(product => (
          <BasketItem 
              key={product.productId}
              product={product}
              removeFrombasket={dispatchRemoveFromBasket}
          />
        ))}
      </div>
      <div className="basket-checkout">
        <div className="basket-total">
          <p className="basket-total-title">Total Amout:</p>
          <h2 className="basket-total-amount">${displayMoney(454546)}</h2>
        </div>
        <Button 
            className="basket-checkout-button button"
        >
          Check Out
        </Button>
      </div>
      
    </div>
  );
};

const mapStateToProps = ({ basket }) => ({
  basket
});

const mapDispatchToProps = dispatch => ({
  dispatchRemoveFromBasket: id => dispatch(removeFromBasket(id))
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
