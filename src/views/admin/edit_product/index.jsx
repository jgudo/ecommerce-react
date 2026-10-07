import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useProduct, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { editProduct } from '@/redux/actions/productActions';
import { ADMIN_PRODUCTS } from '@/constants/routes';

const ProductForm = lazy(() => import('../components/ProductForm'));

const EditProduct = ({ match }) => {
  useDocumentTitle('Edit Product | Salinaka');
  useScrollTop();
  const { product, error, isLoading } = useProduct(match.params.id);
  const dispatch = useDispatch();
  const { id: currentUserId, role } = useSelector((state) => state.auth || {});
  const canEditProduct = !!product && (role === 'SUPER_ADMIN'
    || (role === 'ADMIN' && !!currentUserId && product.createdBy === currentUserId));

  const onSubmitForm = (updates) => {
    dispatch(editProduct(product.id, updates));
  };

  if (error || (product && !canEditProduct)) {
    return <Redirect to={ADMIN_PRODUCTS} />;
  }

  return (
    <div className="product-form-container">
      <h2>Edit Product</h2>
      {product && (
        <Suspense fallback={(
          <div className="loader" style={{ minHeight: '80vh' }}>
            <h6>Loading ... </h6>
            <br />
            <LoadingOutlined />
          </div>
        )}
        >
          <ProductForm
            isLoading={isLoading}
            onSubmit={onSubmitForm}
            product={product}
          />
        </Suspense>
      )}
    </div>
  );
};

EditProduct.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string
    })
  }).isRequired
};

export default withRouter(EditProduct);
