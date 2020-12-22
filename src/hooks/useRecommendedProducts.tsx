import { useState, useEffect } from 'react';
import { IProduct } from 'types/types';
import firebase from '../firebase/firebase';

const useRecommendedProducts = (itemsCount?: number) => {
	const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchRecommendedProducts = async () => {
		try {
			setLoading(true);
			setError('');

			const snap = await firebase.getRecommendedProducts(itemsCount);

			if (snap.empty) {
				setError('No recommended products found.');
			} else {
				let items: Partial<IProduct>[] | any = [];

				snap.forEach((doc) => {
					const data = doc.data();
					items = items.concat([{ id: doc.ref.id, ...data }]);
				});

				setRecommendedProducts(items);
				setLoading(false);
			}
		} catch (e) {
			setError('Failed to fetch recommended products');
			setLoading(false);
		}
	};

	useEffect(() => {
		if (recommendedProducts.length === 0) {
			fetchRecommendedProducts();
		}
	}, []);

	return { recommendedProducts, fetchRecommendedProducts, isLoading, error };
};

export default useRecommendedProducts;