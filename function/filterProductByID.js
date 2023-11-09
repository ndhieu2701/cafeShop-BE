export const filterProductByID = (products, productIDs) => {
  const productsMap = new Map();
  for (const product of products) {
    productsMap.set(product.product, product);
  }

  const filterProducts = products.filter(product => !productIDs.includes(product.product.toString()))
  return filterProducts
};
