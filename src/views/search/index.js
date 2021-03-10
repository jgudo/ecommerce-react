import { LoadingOutlined } from '@ant-design/icons';
import { Boundary, MessageDisplay } from 'components/common';
import { ProductItem } from 'components/product';
import { useDidMount } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from 'redux/actions/miscActions';
import { searchProduct } from 'redux/actions/productActions';

const Search = (props) => {
    const searchKey = props.match.params.searchKey;
    const [columnCount, setColumnCount] = useState(6);
    const dispatch = useDispatch();
    const didMount = useDidMount();
    const { isLoading, products, requestStatus, basket } = useSelector(state => ({
        isLoading: state.app.loading,
        products: state.products.searchedProducts.items,
        basket: state.basket,
        requestStatus: state.app.requestStatus,
    }));

    useEffect(() => {
        if (!didMount && !isLoading) {
            dispatch(searchProduct(searchKey));
        }

        return () => {
            dispatch(setRequestStatus(''));
        }
    }, []);

    const onProductsLengthChanged = () => {
        const width = window.screen.width - 250; // minus 250px padding
        const pLen = products.length

        setColumnCount(Math.floor(width / 160));
        if ((columnCount >= pLen) && pLen !== 0) {
            setColumnCount(pLen);
        }
    };

    useEffect(() => {
        onProductsLengthChanged();
    }, [products]);

    const productListWrapper = useRef(null);

    const foundOnBasket = id => !!basket.find(item => item.id === id);

    return requestStatus && !isLoading ? (
        <main className="content">
            <MessageDisplay
                message={requestStatus}
                desc="Try using correct filters or keyword."
            />
        </main>
    ) : !requestStatus && !isLoading ? (
        <Boundary>
            <main className="content">
                <section className="product-list-wrapper product-list-search">
                    {!requestStatus && (
                        <div className="product-list-header">
                            <div className="product-list-header-title">
                                <h5>
                                    {`Found ${products.length} ${products.length > 1 ? 'products' : 'product'} with keyword ${searchKey}`}
                                </h5>
                            </div>
                        </div>
                    )}
                    <div
                        className="product-list"
                        ref={productListWrapper}
                        style={{ gridTemplateColumns: `repeat(${columnCount}, 160px)` }}
                    >
                        {products.map(product => (
                            <ProductItem
                                isItemOnBasket={foundOnBasket(product.id)}
                                key={product.id}
                                isLoading={isLoading}
                                product={product}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </Boundary>
    ) : (
        <main className="content">
            <div className="loader">
                <h4>Searching Product...</h4>
                <br />
                <LoadingOutlined style={{ fontSize: '3rem' }} />
            </div>
        </main>
    );
};

export default Search;
