/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
export const selectFilter = (products, filter) => {
	if (!products || products.length === 0) return [];

	const keyword = filter.keyword.toLowerCase();

	return products.filter((product) => {
		const isInRange = filter.maxPrice ? (product.price >= filter.minPrice && product.price <= filter.maxPrice) : true;
		const matchKeyword = product.keywords ? product.keywords.includes(keyword) : true;
		const matchName = product.name ? product.name.toLowerCase().includes(keyword) : true;
		const matchDescription = product.description ? product.description.toLowerCase().includes(keyword) : true;
		const matchBrand = product.brand ? product.brand.toLowerCase().includes(filter.brand) : true;

		return ((matchKeyword || matchName || matchDescription) && matchBrand && isInRange);
	}).sort((a, b) => {
		if (filter.sortBy === 'name-desc') {
			return a.name < b.name ? 1 : -1;
		} else if (filter.sortBy === 'name-asc') {
			return a.name > b.name ? 1 : -1;
		} else if (filter.sortBy === 'price-desc') {
			return a.price < b.price ? 1 : -1;
		} else if (filter.sortBy === 'price-asc') {
			return a.price > b.price ? 1 : -1;
		}
	});
};

// Select product with highest price
export const selectMax = (products) => {
	if (!products || products.length === 0) return 0;

	let high = products[0];

	for (let i = 0; i < products.length; i++) {
		if (products[i].price > high.price) {
			high = products[i];
		}
	}

	return Math.floor(high.price);
};

// Select product with lowest price
export const selectMin = (products) => {
	if (!products || products.length === 0) return 0;
	let low = products[0];

	for (let i = 0; i < products.length; i++) {
		if (products[i].price < low.price) {
			low = products[i];
		}
	}

	return Math.floor(low.price);
};
