import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductList from '../../components/product/ProductList';
import ProductItem from '../../components/product/ProductItem';
import ProductAppliedFilters from '../../components/product/ProductAppliedFilters';
import Header from './Header';
import Modal from '../../components/ui/Modal';

import ProductModalDetails from '../../components/product/ProductModalDetails';

const Home = () => {
  const { products, filter, isLoading } = useSelector(state => ({
    products: state.products,
    filter: state.filter,
    isLoading: state.app.loading
  }));
  const dispatch = useDispatch();
  const [isOpenModal, setModalOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const productListWrapper = useRef(null);
  const onClickProduct = (product) => {
    setProductSelected(product);
  };

  // Pass this method to each product item 
  // this will be triggered when product was clicked and will open the modal
  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <section className="product-list-wrapper">
        <div className="product-list-header">
          <Header 
              dispatch={dispatch}
              products={products}
              filter={filter}
              isLoading={isLoading}
          />
        </div>
        <ProductAppliedFilters filter={filter}/>
        <ProductList>
          {({ state, action, foundOnBasket }) => (
            <>
              <Modal 
                  isOpen={isOpenModal}
                  onRequestClose={onCloseModal}
              >
                <ProductModalDetails 
                    product={productSelected}
                    foundOnBasket={foundOnBasket}
                    addToBasket={action.addToBasket} 
                />
                <button 
                    className="modal-close-button button button-border button-border-gray button-small"
                    onClick={onCloseModal}
                >
                  X
                </button>
              </Modal>
              <div 
                  className="product-list" 
                  ref={productListWrapper}
                  style={{
                    gridTemplateColumns: `repeat(${state.columnCount}, 160px)`
                  }}
              >
                {state.products.map(product => (
                  <ProductItem
                      addToBasket={action.addToBasket} 
                      basket={state.basket}
                      foundOnBasket={foundOnBasket}
                      key={product.id}
                      onOpenModal={onOpenModal}
                      onClickProduct={onClickProduct}
                      product={product}
                      removeFromBasket={action.removeFromBasket}
                  />
                ))}
              </div>
            </>
          )}
        </ProductList>
      </section>
    </>
  );
};

export default Home;
