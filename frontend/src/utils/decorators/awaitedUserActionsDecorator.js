import actionTypes from '../../actions/actionTypes';

const awaitedUserActionsDecorator = thunk => async (dispatch) => {
  dispatch({
    type: actionTypes.user.USER_REQUEST,
  });

  try {
    await thunk(dispatch);
  } catch (e) {
    dispatch({
      type: actionTypes.user.USER_REQUEST_ERROR,
    });
  }
};

export default awaitedUserActionsDecorator;
