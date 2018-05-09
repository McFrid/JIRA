import actionTypes from '../actionTypes';

import productsService from '../../services/products-service';

const storeProduct = product => async (dispatch) => {
  const response = await productsService.saveProduct(product);

  dispatch({
    type: actionTypes.product.PRODUCT_STORE,
    payload: {
      product: {
        ...response.data,
      },
    },
  });
};

const updateProduct = (id, product) => async (dispatch) => {
  const response = await productsService.updateProduct({
    ...product,
    id,
  });

  dispatch({
    type: actionTypes.product.PRODUCT_UPDATE,
    payload: {
      product: response.data,
    },
  });
};

const removeProduct = id => async (dispatch) => {
  try {
    await productsService.removeProduct(id);

    dispatch({
      type: actionTypes.product.PRODUCT_REMOVE,
      payload: {
        id,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export default {
  storeProduct,
  updateProduct,
  removeProduct,
};
