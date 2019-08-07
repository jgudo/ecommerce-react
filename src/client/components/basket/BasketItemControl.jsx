import React from 'react';


const BasketItemControl = ({ action, basket, product }) => {
  const onAddQty = () => {
    if (product.maxQuantity !== product.quantity) {
      action.addQtyItem(product.id);
    }
  };

  const onMinusQty = () => {
    if (product.maxQuantity >= product.quantity && product.quantity >= 2) {
      action.minusQtyItem(product.id);
    }
  };

  return (
    <div className="basket-item-control">
      <button 
          className="button button-border button-border-gray button-small basket-control basket-control-add"
          disabled={product.maxQuantity === product.quantity}
          onClick={onAddQty}
      >
        +
      </button>
      <button 
          className="button button-border button-border-gray button-small basket-control basket-control-minus"
          disabled={product.quantity === 1}
          onClick={onMinusQty}
      >
        -
      </button>
    </div>
  );
};

export default BasketItemControl;
