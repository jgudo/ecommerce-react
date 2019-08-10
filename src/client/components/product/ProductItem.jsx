import React from 'react';
import { connect } from 'react-redux';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';
import { displayActionMessage } from '../../helpers/utils';

const ProductItem = (props) => {
  const { 
    product,
    basket,
    dispatchAddToBasket,
    dispatchRemoveFromBasket
  } = props;
  const foundOnBasket = () => {
    return !!basket.find(item => item.id === product.id); 
  };

  const onAddToBasket = () => {
    if (foundOnBasket()) {
      dispatchRemoveFromBasket(product.id);
      displayActionMessage('Item removed from basket');
    } else {
      dispatchAddToBasket(product);
      displayActionMessage('Item added to basket');
    }
  };

  return props.children({
    state: {
      product,
      basket
    },
    action: {
      onAddToBasket
    },
    foundOnBasket
  });
};

const mapStateToProps = ({ basket }) => ({
  basket
});

const mapDispatchToprops = dispatch => ({
  dispatchAddToBasket: product => dispatch(addToBasket(product)),
  dispatchRemoveFromBasket: id => dispatch(removeFromBasket(id))
});

export default connect(mapStateToProps, mapDispatchToprops)(ProductItem);
