import firebase from 'firebase/firebase';
import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useProduct = (id) => {
    // get and check if product exists in store
    const storeProduct = useSelector(state => state.products.items.find(item => item.id === id));

    const [product, setProduct] = useState(storeProduct);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const didMount = useDidMount(true);

    useEffect(() => {
        (async () => {
            try {
                if (!product || product.id !== id) {
                    setLoading(true);
                    const doc = await firebase.getProduct(id);

                    if (doc.exists) {
                        const data = { ...doc.data(), id: doc.ref.id };

                        if (didMount) {
                            setProduct(data);
                            setLoading(false);
                        }
                    } else {
                        didMount && setError('Product not found.');
                    }
                }
            } catch (err) {
                if (didMount) {
                    setLoading(false);
                    setError(err?.message || 'Something went wrong.');
                }
            }
        })()
    }, [id]);

    return { product, isLoading, error };
}

export default useProduct;