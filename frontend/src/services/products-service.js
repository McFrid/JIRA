import request from '../utils/request';

const PRODUCTS_BASE = 'products';

const fetchProducts = () => request.get(PRODUCTS_BASE);

const fetchProductsPage = (page, size) => request.get(`${PRODUCTS_BASE}`, {
  page,
  size,
});

const saveProduct = product => request.post(PRODUCTS_BASE, product);

const updateProduct = product => request.put(PRODUCTS_BASE, product);

const removeProduct = id => request.delete(`${PRODUCTS_BASE}/${id}`);

const fetchProductsCount = () => request.get(`${PRODUCTS_BASE}/count`);

export default {
  fetchProducts,
  fetchProductsPage,
  saveProduct,
  updateProduct,
  removeProduct,
  fetchProductsCount,
};
