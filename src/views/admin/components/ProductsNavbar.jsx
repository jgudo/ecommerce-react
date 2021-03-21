import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle, SearchBar } from 'components/common';
import { ADD_PRODUCT } from 'constants/routes';
import React from 'react';
import { useHistory } from 'react-router';

const ProductsNavbar = (props) => {
    const { productsCount, totalProductsCount } = props;
    const history = useHistory();

    return (
        <div className="product-admin-header">
            <h3 className="product-admin-header-title">
                Products &nbsp;
                ({`${productsCount} / ${totalProductsCount}`})
            </h3>
            <SearchBar />
            &nbsp;
            <FiltersToggle>
                <button className="button-muted button-small">
                    <FilterOutlined />&nbsp;More Filters
                </button>
            </FiltersToggle>
            <button
                className="button button-small"
                onClick={() => history.push(ADD_PRODUCT)}
            >
                <PlusOutlined /> &nbsp; Add New Product
            </button>
        </div>
    )
};

export default ProductsNavbar;
