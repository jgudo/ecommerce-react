import React, { useState, useEffect } from 'react';
import ProductList from '../../components/product/ProductList';
import ProductItem from '../../components/product/ProductItem';
import Header from './Header';
import Modal from '../../components/ui/Modal';

import ProductAppliedFilters from '../../components/product/ProductAppliedFilters';
import ProductModalDetails from '../../components/product/ProductModalDetails';

const Home = () => {
  const [isOpenModal, setModalOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);

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
        <Header />
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
              <ProductAppliedFilters products={state.products} filter={state.filter} />
              <div className="product-list">
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
