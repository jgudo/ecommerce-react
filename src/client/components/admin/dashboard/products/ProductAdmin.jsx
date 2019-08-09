import React, { useRef } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { displayMoney } from '../../../../helpers/utils';

const ProductAdmin = (props) => {
  const { product, removeProduct } = props;
  const productRef = useRef(null);

  const onClickEdit = () => {
    props.history.push(`/edit/${product.id}`);
  };

  const onDeleteProduct = () => {
    productRef.current.classList.toggle('product-active');
  };
  
  const onConfirmDelete = () => {
    removeProduct(product.id);
    productRef.current.classList.remove('product-active');
  };

  const onCancelDelete = () => {
    productRef.current.classList.remove('product-active');
  };

  return (
    <div 
        className="product-admin"
        ref={productRef}
    >
      <div className="item-col-img">
        <img 
            alt={product.name}
            className="product-admin-img"
            src={product.image} 
        />
      </div>
      <div className="item-col-name">
        <span className="text-overflow-ellipsis">{product.name}</span>
      </div>
      <div className="item-col-brand">
        <span>{product.brand}</span>
      </div>
      <div className="item-col-price">
        <span>{displayMoney(product.price)}</span>
      </div>
      <div className="item-col-date">
        <span>{moment(product.dateAdded).format('ll')}</span>
      </div>
      <div className="item-col-maxquantity">
        <span>{product.maxQuantity}</span>
      </div>
      <div className="item-col-action">
        <button 
            className="button button-border button-border-gray button-small"
            onClick={onClickEdit}
        >
          Edit
        </button>
        <button
            className="button button-border button-border-gray button-small"
            onClick={onDeleteProduct}
        >
          Delete
        </button>
        <div className="item-col-action-confirm">
          <h5>Are you sure you want to delete this?</h5>
          <button 
              className="button button-small"
              onClick={onConfirmDelete}
          >
            Yes
          </button>
          &nbsp;
          <button 
              className="button button-small button-border"
              onClick={onCancelDelete}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductAdmin);
