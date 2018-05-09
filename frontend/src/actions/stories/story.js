import actionTypes from '../actionTypes';

import storiesService from '../../services/stories-service';

const storeStory = story => async (dispatch) => {
  const response = await storiesService.saveStory(story);

  dispatch({
    type: actionTypes.story.STORY_STORE,
    payload: {
      story: {
        ...response.data,
      },
    },
  });
};

const updateStory = (id, story) => async (dispatch) => {
  const response = await storiesService.updateStory({
    ...story,
    id,
  });

  dispatch({
    type: actionTypes.story.STORY_UPDATE,
    payload: {
      story: response.data,
    },
  });
};

const removeStory = id => async (dispatch) => {
  try {
    await storiesService.removeStory(id);

    dispatch({
      type: actionTypes.story.STORY_REMOVE,
      payload: {
        id,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export default {
  storeStory,
  updateStory,
  removeStory,
};
