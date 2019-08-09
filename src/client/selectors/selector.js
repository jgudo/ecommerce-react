export const selectFilter = (products, filter) => {
  if (!products || products.length === 0) return [];

  const keyword = filter.keyword.toLowerCase();

  return products.filter((product) => {
    const isInRange = filter.maxPrice ? (product.price >= filter.minPrice && product.price <= filter.maxPrice) : true;
    const matchKeyword = product.keywords.includes(keyword);
    const matchName = product.name.toLowerCase().includes(keyword);
    const matchDescription = product.description.toLowerCase().includes(keyword);
    const matchBrand = product.brand.toLowerCase().includes(filter.brand);

    return ((matchKeyword || matchName || matchDescription) && matchBrand && isInRange);
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
