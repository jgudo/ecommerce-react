import { useState, useEffect } from 'react';
import { IProduct } from 'types/types';
import firebase from '../firebase/firebase';

const useFeaturedProducts = (itemsCount?: number) => {
	const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchFeaturedProducts = async () => {
		try {
			setLoading(true);
			setError('');

			const docs = await firebase.getFeaturedProducts(itemsCount);

			if (docs.empty) {
				setError('No featured products found.');
			} else {
				let items: Partial<IProduct>[] | any = [];

				docs.forEach((doc) => {
					const data = doc.data();
					items = items.concat([{ id: doc.id, ...data }]);
				});

				setFeaturedProducts(items);
				setLoading(false);
			}
		} catch (e) {
			setError('Failed to fetch featured products');
			setLoading(false);
		}
	};

	useEffect(() => {
		if (featuredProducts.length === 0) {
			fetchFeaturedProducts();
		}
	}, []);

	return { featuredProducts, fetchFeaturedProducts, isLoading, error };
};

export default useFeaturedProducts;