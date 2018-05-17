import actionTypes from '../../actions/actionTypes';

const awaitedProductActionsDecorator = thunk => async (dispatch) => {
  dispatch({
    type: actionTypes.product.PRODUCT_REQUEST,
  });

  try {
    await thunk(dispatch);
  } catch (e) {
    dispatch({
      type: actionTypes.product.PRODUCT_REQUEST_ERROR,
    });

    throw e;
  }
};

export default awaitedProductActionsDecorator;
