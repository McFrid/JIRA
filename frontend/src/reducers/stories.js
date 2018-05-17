import actionTypes from '../actions/actionTypes';

const initState = {
  items: [],
  areFetching: false,
  areLoaded: false,
  isCountFetching: false,
  isCountLoaded: false,
  isError: false,
  count: 0,
};

const storiesState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.story.STORY_STORE:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload.story,
        ],
        count: state.count + 1,
      };

    case actionTypes.story.STORY_UPDATE:
      return {
        ...state,
        items: state.items.map((story) => {
          if (story.id === action.payload.story.id) {
            return {
              ...action.payload.story,
            };
          }

          return story;
        }),
      };

    case actionTypes.story.STORY_REMOVE:
      return {
        ...state,
        items: state.items.filter(story => story.id !== action.payload.id),
        count: state.count - 1,
      };

    case actionTypes.stories.STORIES_FETCH:
      return {
        ...state,
        items: [],
        areFetching: true,
        areLoaded: false,
      };

    case actionTypes.stories.STORIES_STORE:
      return {
        ...state,
        items: action.payload.stories,
        areFetching: false,
        areLoaded: true,
      };

    case actionTypes.story.STORY_REQUEST:
      return {
        ...state,
        isError: false,
      };

    case actionTypes.story.STORY_REQUEST_ERROR:
      return {
        ...state,
        isError: true,
      };

    case actionTypes.stories.STORIES_COUNT_FETCH:
      return {
        ...state,
        isCountFetching: true,
        isCountLoaded: false,
      };

    case actionTypes.stories.STORIES_COUNT_STORE:
      return {
        ...state,
        isCountFetching: false,
        isCountLoaded: true,
        count: action.payload.count,
      };

    case actionTypes.stories.STORIES_REMOVE:
      return {
        ...state,
        items: state.items.filter(item =>
          !action.payload.ids.includes(item.id)),
      };

    default:
      return state;
  }
};

export default storiesState;
