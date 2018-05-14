import actionTypes from '../actionTypes';
import actions from '../index';
import productsService from '../../services/products-service';

const storeProducts = products => ({
  type: actionTypes.products.PRODUCTS_STORE,
  payload: {
    products,
  },
});

const fetchProducts = () => async (dispatch) => {
  dispatch({
    type: actionTypes.products.PRODUCTS_FETCH,
  });

  try {
    const products = await productsService.fetchProducts();
    dispatch(storeProducts(products.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

const fetchProductsPage = (page, size) => async (dispatch) => {
  dispatch({
    type: actionTypes.products.PRODUCTS_FETCH,
  });

  try {
    const products = await productsService.fetchProductsPage(page, size);
    dispatch(storeProducts(products.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

const fetchProductsCount = () => async (dispatch) => {
  dispatch({
    type: actionTypes.products.PRODUCTS_COUNT_FETCH,
  });

  try {
    const productsCount = await productsService.fetchProductsCount();
    dispatch({
      type: actionTypes.products.PRODUCTS_COUNT_STORE,
      payload: {
        count: productsCount.data,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

export default {
  fetchProducts,
  fetchProductsPage,
  fetchProductsCount,
};
