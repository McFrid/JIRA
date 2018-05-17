import actionTypes from '../../actions/actionTypes';

const awaitedEmailActionsDecorator = thunk => async (dispatch) => {
  dispatch({
    type: actionTypes.issue.ISSUE_REQUEST,
  });

  try {
    await thunk(dispatch);
  } catch (e) {
    dispatch({
      type: actionTypes.issue.ISSUE_REQUEST_ERROR,
    });
  }
};

export default awaitedEmailActionsDecorator;
