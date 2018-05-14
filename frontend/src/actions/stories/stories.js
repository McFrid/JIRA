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

const fetchStoriesPage = (page, size) => async (dispatch) => {
  dispatch({
    type: actionTypes.stories.STORIES_FETCH,
  });

  try {
    const stories = await storiesService.fetchStoriesPage(page, size);
    dispatch(storeStories(stories.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

const fetchStoriesCount = () => async (dispatch) => {
  dispatch({
    type: actionTypes.stories.STORIES_COUNT_FETCH,
  });

  try {
    const storiesCount = await storiesService.fetchStoriesCount();
    dispatch({
      type: actionTypes.stories.STORIES_COUNT_STORE,
      payload: {
        count: storiesCount.data,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

export default {
  fetchStories,
  fetchStoriesPage,
  fetchStoriesCount,
};
