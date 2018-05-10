import actionTypes from '../actionTypes';
import actions from '../index';
import storiesService from '../../services/stories-service';

const storeStories = stories => ({
  type: actionTypes.stories.STORIES_STORE,
  payload: {
    stories,
  },
});

const fetchStories = () => async (dispatch) => {
  dispatch({
    type: actionTypes.stories.STORIES_FETCH,
  });

  try {
    const stories = await storiesService.fetchStories();
    dispatch(storeStories(stories.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

export default {
  fetchStories,
};
