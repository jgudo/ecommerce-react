import React, { useRef } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import { displayMoney, displayActionMessage } from '../../../../helpers/utils';

const ProductAdmin = (props) => {
  const { product, removeProduct } = props;
  const productRef = useRef(null);

  const onClickEdit = () => {
    props.history.push(`/dashboard/edit/${product.id}`);
  };

  const onDeleteProduct = () => {
    productRef.current.classList.toggle('item-active');
  };
  
  const onConfirmDelete = () => {
    removeProduct(product.id);
    displayActionMessage('Item successfully deleted');
    productRef.current.classList.remove('item-active');
  };

  const onCancelDelete = () => {
    productRef.current.classList.remove('item-active');
  };

  return (
    <div 
        className="item item-products"
        ref={productRef}
    >
      <div className="grid grid-count-6">
        <div className="grid-col">
          <img 
              alt={product.name}
              className="item-img"
              src={product.image} 
          />
        </div>
        <div className="grid-col">
          <span className="text-overflow-ellipsis">{product.name}</span>
        </div>
        <div className="grid-col">
          <span>{product.brand}</span>
        </div>
        <div className="grid-col">
          <span>{displayMoney(product.price)}</span>
        </div>
        <div className="grid-col">
          <span>{moment(product.dateAdded).format('ll')}</span>
        </div>
        <div className="grid-col">
          <span>{product.maxQuantity}</span>
        </div>
      </div>
      <div className="item-action">
        <button 
            className="button button-border button-small"
            onClick={onClickEdit}
        >
          Edit
        </button>
        &nbsp;
        <button
            className="button button-border button-small"
            onClick={onDeleteProduct}
        >
          Delete
        </button>
        <div className="item-action-confirm">
          <h5>Are you sure you want to delete this?</h5>
          <button 
              className="button button-small button-border"
              onClick={onCancelDelete}
          >
            No
          </button>
          &nbsp;
          <button 
              className="button button-small"
              onClick={onConfirmDelete}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductAdmin);
