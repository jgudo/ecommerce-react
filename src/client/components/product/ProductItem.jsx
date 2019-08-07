import React from 'react';
import { connect } from 'react-redux';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';

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
    foundOnBasket() ? dispatchRemoveFromBasket(product.id) : dispatchAddToBasket(product);
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
