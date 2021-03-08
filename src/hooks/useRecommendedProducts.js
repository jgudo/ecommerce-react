import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import firebase from '../firebase/firebase';

const useRecommendedProducts = (itemsCount) => {
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const didMount = useDidMount(true);

    useEffect(() => {
        if (recommendedProducts.length === 0 && didMount) {
            fetchRecommendedProducts();
        }
    }, []);

    const fetchRecommendedProducts = async () => {
        try {
            setLoading(true);
            setError('');

            const docs = await firebase.getRecommendedProducts(itemsCount);

            if (docs.empty) {
                didMount && setError('No recommended products found.');
            } else {
                const items = [];

                docs.forEach((snap) => {
                    const data = snap.data();
                    items.push({ id: snap.ref.id, ...data });
                });

                if (didMount) {
                    setRecommendedProducts(items);
                    setLoading(false);
                }
            }
        } catch (e) {
            if (didMount) {
                setError('Failed to fetch recommended products');
                setLoading(false);
            }
        }
    };

    return { recommendedProducts, fetchRecommendedProducts, isLoading, error };
};

export default useRecommendedProducts;
