import actionTypes from '../actions/actionTypes';

const requestDecorator = thunk => async (dispatch) => {
  dispatch({
    type: actionTypes.app.APP_REQUEST,
  });

  await thunk(dispatch);

  dispatch({
    type: actionTypes.app.APP_REQUEST_COMPLETED,
  });
};

export default requestDecorator;
