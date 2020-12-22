import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from 'components/product/ProductItem';
import CircularProgress from 'components/ui/CircularProgress';
import MessageDisplay from 'components/ui/MessageDisplay';
import Boundary from 'components/ui/Boundary';
import { searchProduct } from 'redux/actions/productActions';
import { setRequestStatus } from 'redux/actions/miscActions';
import useDidMount from 'hooks/useDidMount';

const Search = (props) => {
    const searchKey = props.match.params.searchKey;
    const [columnCount, setColumnCount] = useState(6);
    const dispatch = useDispatch();
    const didMount = useDidMount();
    const { isLoading, products, requestStatus, lastRefKey, basket } = useSelector(state => ({
        isLoading: state.app.loading,
        products: state.products.searchedProducts.items,
        basket: state.basket,
        lastRefKey: state.products.searchedProducts.lastRefKey,
        requestStatus: state.app.requestStatus,
    }));

    useEffect(() => {
        if (!didMount && !isLoading) {
            dispatch(searchProduct(undefined, searchKey));
        }

        return () => {
            dispatch(setRequestStatus(''));
        }
    }, []);

    useEffect(() => {
        if (didMount && !isLoading) {
            dispatch(searchProduct(lastRefKey, searchKey));
        }
    }, [lastRefKey, searchKey]);

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
        <MessageDisplay
            message={requestStatus}
            desc="Try using correct filters or keyword."
        />
    ) : !requestStatus && !isLoading ? (
        <Boundary>
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
        </Boundary>
    ) : (
                <div className="loader"><CircularProgress /></div>
            );
};

export default Search;
