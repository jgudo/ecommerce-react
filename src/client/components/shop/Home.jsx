import React, { useState } from 'react';
import ProductList from '../product/ProductList';
import ProductClient from '../product/ProductClient';
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

  // Pass this method to each product item | triggered when product was clicked
  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal 
          isOpen={isOpenModal}
          onRequestClose={onCloseModal}
      >
        <ProductModalDetails product={productSelected} />
        <button 
            className="modal-close-button button button-border button-border-gray button-small"
            onClick={onCloseModal}
        >
          X
        </button>
      </Modal>

      {/* MAIN CONTENT ----------------------- */}
      <Sidebar />
      <section className="product-list-wrapper">
        <ProductList>
          {({ products, basket, removeFromBasket, filter, addToBasket, isLoading }) => (
            <>
              <div className="product-list-header">
                <h2 className="product-list-title">
                  Eyewear &nbsp;
                  <span className="text-subtle">
                    {products.length} {products.length > 1 ? 'items ' : 'item '}
                  </span>
                </h2>
                <div className="product-list-search">
                  <SearchBar />
                </div>
              </div>
              <ProductAppliedFilters products={products} filter={filter} />
              <div className="product-list">
                {products.map(product => (
                  <ProductClient 
                      addToBasket={addToBasket} 
                      removeFromBasket={removeFromBasket}
                      basket={basket}
                      key={product.id}
                      product={product}
                      onOpenModal={onOpenModal}
                      onClickProduct={onClickProduct}
                  />
                ))}
              </div>
              {(products.length === 0 && !isLoading) && (
                <div className="product-list-empty">
                  <h4>There are no items found</h4>
                  <span>Try using correct filters and keyword</span>
                </div>
              )}
              {(products.length === 0 && isLoading) && (
                <div className="progress-loading">
                  <CircularProgress visible={isLoading} theme="dark" />
                  <br/>
                  <h5>Fetching products, please wait</h5>
                </div>
              )}
            </>
          )}
        </ProductList>
      </section>
    </>
  );
};

export default Home;
