import actionTypes from '../../actions/actionTypes';

const awaitedRequestDecorator = (thunk, shouldCatchError) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.app.APP_REQUEST,
    });

    await thunk(dispatch);
  } catch (e) {
    if (!shouldCatchError) {
      throw e;
    }
  } finally {
    dispatch({
      type: actionTypes.app.APP_REQUEST_COMPLETED,
    });
  }
};

export default awaitedRequestDecorator;
