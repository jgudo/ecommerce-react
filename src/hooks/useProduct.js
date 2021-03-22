import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'services/firebase';

const useProduct = (id) => {
  // get and check if product exists in store
  const storeProduct = useSelector((state) => state.products.items.find((item) => item.id === id));

  const [product, setProduct] = useState(storeProduct);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!product || product.id !== id) {
          setLoading(true);
          const doc = await firebase.getSingleProduct(id);

          if (doc.exists) {
            const data = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              setProduct(data);
              setLoading(false);
            }
          } else {
            setError('Product not found.');
          }
        }
      } catch (err) {
        if (didMount) {
          setLoading(false);
          setError(err?.message || 'Something went wrong.');
        }
      }
    })();
  }, [id]);

  return { product, isLoading, error };
};

export default useProduct;
