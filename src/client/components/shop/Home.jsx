import React, { useState } from 'react';
import ProductList from '../product/ProductList';
import ProductClient from '../product/ProductClient';
import SearchBar from '../ui/SearchBar';
import Sidebar from '../ui/Sidebar';
import Modal from '../ui/Modal';

import { displayMoney } from '../../helpers/utils';
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
          {({ products, basket, removeFromBasket, filter, addToBasket }) => (
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
              <div className="product-applied-filters">
                {((filter.keyword || filter.brand || !!filter.minPrice || !!filter.maxPrice) && products.length >= 1) && (
                    <>
                      <span>Applied filters:</span> &nbsp;
                      {filter.keyword && (<span>Keyword: <mark>{filter.keyword}</mark>&nbsp;</span>)}
                      {filter.brand && (<span>Brand: <mark>{filter.brand}</mark>&nbsp;</span>)}
                      {(!!filter.minPrice || !!filter.maxPrice) && (
                        <span>
                          Price Range: &nbsp;
                          <mark>{displayMoney(filter.minPrice)}&nbsp;-&nbsp;{displayMoney(filter.maxPrice)}</mark>
                          &nbsp;
                        </span>
                      )}
                    </>
                )}
              </div>
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
              {products.length === 0 && (
                <div className="product-list-empty">
                  <h4>There are no items found</h4>
                  <span>Try using correct filters and keyword</span>

                  <div className="product-list-empty-filters">
                    {filter.keyword && (
                      <p>Keyword used: <mark><strong>{filter.keyword}</strong></mark></p>
                    )}
                    {filter.brand && (
                      <p>
                        Brand: <mark><strong>{filter.brand}</strong></mark>
                      </p>
                    )}
                    {(!!filter.minPrice || !!filter.maxPrice) && (
                      <p>
                        Price Range: &nbsp;
                        <mark><strong>{displayMoney(filter.minPrice)}</strong></mark>
                        &nbsp;—&nbsp; 
                        <mark><strong>{displayMoney(filter.maxPrice)}</strong></mark>
                      </p>
                    )}
                  </div>
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
