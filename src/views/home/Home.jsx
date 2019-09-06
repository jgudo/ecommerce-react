import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '../../selectors/selector';

import ProductList from '../../components/product/ProductList';
import ProductItem from '../../components/product/ProductItem';
import ProductAppliedFilters from '../../components/product/ProductAppliedFilters';
import Header from './Header';
import Modal from '../../components/ui/Modal';
import Boundary from '../../components/ui/Boundary';
import ProductModalDetails from '../../components/product/ProductModalDetails';

const Home = (props) => {
  const [isOpenModal, setModalOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [columnCount, setColumnCount] = useState(6);

  useEffect(() => {
    onProductsLengthChanged();
  }, [filteredProducts]);

  const { products, filter, basket, isLoading, filteredProducts, requestStatus } = useSelector(state => ({
    products: state.products,
    filter: state.filter,
    basket: state.basket,
    isLoading: state.app.loading,
    filteredProducts: selectFilter(state.products, state.filter),
    requestStatus: state.app.requestStatus
  }));
  const dispatch = useDispatch();
  const productListWrapper = useRef(null);

  const onClickProduct = (product) => {
    setProductSelected(product);
  };

  const onProductsLengthChanged = () => {
    const width = window.screen.width - 120; // minus 120px padding

    setColumnCount(Math.floor(width / 160));
    if ((columnCount >= filteredProducts.length) && filteredProducts.length !== 0) {
      setColumnCount(filteredProducts.length);
    }
  };

  const foundOnBasket = (id) => !!basket.find(item => item.id === id); 

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };
 
  return (
    <>
      <section className="product-list-wrapper">
        {(!requestStatus && !isLoading) &&(
          <div className="product-list-header">
            <Header 
                dispatch={dispatch}
                products={products}
                filter={filter}
                filteredProducts={filteredProducts}
                isLoading={isLoading}
            />
          </div>
        )}
        <ProductAppliedFilters filter={filter}/>
        <Boundary>
          <ProductList
              dispatch={dispatch}
              productsLength={products.length}
              filteredProductsLength={filteredProducts.length}
              foundOnBasket={foundOnBasket}
              isLoading={isLoading}
              requestStatus={requestStatus}
          >
            <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
              <ProductModalDetails 
                  product={productSelected}
                  dispatch={dispatch}
                  foundOnBasket={foundOnBasket}
              />
              <button 
                  className="modal-close-button button-muted button-small"
                  onClick={onCloseModal}
              >
                X
              </button>
            </Modal>
            <div 
                className="product-list" 
                ref={productListWrapper}
                style={{ gridTemplateColumns: `repeat(${columnCount}, 160px)` }}
            >
              {filteredProducts.length === 0 ? new Array(14).fill({}).map((product, index) => (
                <ProductItem
                    foundOnBasket={foundOnBasket}
                    key={`product-skeleton ${index}`}
                    product={product}
                />
              )) : filteredProducts.map(product => (
                <ProductItem
                    foundOnBasket={foundOnBasket}
                    dispatch={dispatch}
                    key={product.id}
                    onOpenModal={onOpenModal}
                    onClickProduct={onClickProduct}
                    product={product}
                />
              ))}
            </div>
          </ProductList>
        </Boundary>
      </section>
    </>
  );
};

export default Home;
