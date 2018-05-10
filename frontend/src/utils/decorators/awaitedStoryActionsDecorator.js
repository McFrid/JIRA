import actionTypes from '../../actions/actionTypes';

const awaitedStoryActionsDecorator = thunk => async (dispatch) => {
  dispatch({
    type: actionTypes.story.STORY_REQUEST,
  });

  try {
    await thunk(dispatch);
  } catch (e) {
    dispatch({
      type: actionTypes.story.STORY_REQUEST_ERROR,
    });
  }
};

export default awaitedStoryActionsDecorator;
