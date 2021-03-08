import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import firebase from '../firebase/firebase';

const useFeaturedProducts = (itemsCount) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const didMount = useDidMount(true);

    useEffect(() => {
        if (featuredProducts.length === 0 && didMount) {
            fetchFeaturedProducts();
        }
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            setLoading(true);
            setError('');

            const docs = await firebase.getFeaturedProducts(itemsCount);

            if (docs.empty) {
                didMount && setError('No featured products found.');
            } else {
                const items = [];

                docs.forEach((snap) => {
                    const data = snap.data();
                    items.push({ id: snap.ref.id, ...data });
                });

                if (didMount) {
                    setFeaturedProducts(items);
                    setLoading(false);
                }
            }
        } catch (e) {
            if (didMount) {
                setError('Failed to fetch featured products');
                setLoading(false);
            }
        }
    };

    return { featuredProducts, fetchFeaturedProducts, isLoading, error };
};

export default useFeaturedProducts;
