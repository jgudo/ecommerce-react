import React, { useState } from 'react';
import ProductList from '../product/ProductList';
import ProductItem from '../product/ProductItem';
import SearchBar from '../ui/SearchBar';
import Sidebar from '../ui/Sidebar';
import Modal from '../ui/Modal';
import CircularProgress from '../ui/CircularProgress';

import ProductAppliedFilters from '../product/ProductAppliedFilters';
import ProductModalDetails from '../product/ProductModalDetails';

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
      {/* MAIN CONTENT ----------------------- */}
      {window.screen.width > 480 && <Sidebar />}
      <section className="product-list-wrapper">
        <div className="product-list-header">
          <h2 className="product-list-title">
            Eyewear 
          </h2>
          {window.screen.width > 480 && (
            <div className="product-list-search">
              <SearchBar>
                {({ onSearchChange, onKeyUp, isLoading, onSubmitSearch }) => (
                  <div className="searchbar">
                    <input
                        className="searchbar-input" 
                        onChange={onSearchChange}
                        onKeyUp={onKeyUp}
                        placeholder="Search for product"
                        readOnly={isLoading}
                        type="text" 
                    />
                    <button 
                        className="button button-small searchbar-button"
                        disabled={isLoading}
                        onClick={onSubmitSearch}
                    >
                      Search
                    </button>
                  </div>
                )}
              </SearchBar>
            </div>
          )}
        </div>
        <ProductList>
          {({ 
            products, 
            basket, 
            removeFromBasket, 
            filter, 
            addToBasket, 
            isLoading,
            foundOnBasket
          }) => (
            <>
              <Modal 
                  isOpen={isOpenModal}
                  onRequestClose={onCloseModal}
              >
                <ProductModalDetails 
                    product={productSelected}
                    foundOnBasket={foundOnBasket}
                    addToBasket={addToBasket} 
                />
                <button 
                    className="modal-close-button button button-border button-border-gray button-small"
                    onClick={onCloseModal}
                >
                  X
                </button>
              </Modal>
              <ProductAppliedFilters products={products} filter={filter} />
              <div className="product-list">
                {products.map(product => (
                  <ProductItem
                      addToBasket={addToBasket} 
                      basket={basket}
                      foundOnBasket={foundOnBasket}
                      key={product.id}
                      onOpenModal={onOpenModal}
                      onClickProduct={onClickProduct}
                      product={product}
                      removeFromBasket={removeFromBasket}
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
