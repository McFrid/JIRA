import request from '../utils/request';

const PRODUCTS_BASE = 'products';

const fetchProducts = () => request.get(PRODUCTS_BASE);

const saveProduct = product => request.post(PRODUCTS_BASE, product);

const updateProduct = product => request.put(PRODUCTS_BASE, product);

const removeProduct = id => request.delete(`${PRODUCTS_BASE}/${id}`);

export default {
  fetchProducts,
  saveProduct,
  updateProduct,
  removeProduct,
};
