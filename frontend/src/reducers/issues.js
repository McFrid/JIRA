import actionTypes from '../actions/actionTypes';

const initState = {
  items: [],
  areFetching: false,
  areLoaded: false,
  isError: false,
};

const issuesState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.issue.ISSUE_STORE:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload.issue,
        ],
      };

    case actionTypes.issue.ISSUE_UPDATE:
      return {
        ...state,
        items: state.items.map((issue) => {
          if (issue.id === action.payload.issue.id) {
            return {
              ...action.payload.issue,
            };
          }

          return issue;
        }),
      };

    case actionTypes.issue.ISSUE_REMOVE:
      return {
        ...state,
        items: state.items.filter(issue => issue.id !== action.payload.id),
      };

    case actionTypes.issues.ISSUES_FETCH:
      return {
        ...state,
        items: [],
        areFetching: true,
        areLoaded: false,
      };

    case actionTypes.issues.ISSUES_STORE:
      return {
        ...state,
        items: action.payload.issues,
        areFetching: false,
        areLoaded: true,
      };

    case actionTypes.issue.ISSUE_REQUEST:
      return {
        ...state,
        isError: false,
      };

    case actionTypes.issue.ISSUE_REQUEST_ERROR:
      return {
        ...state,
        isError: true,
      };

    default:
      return state;
  }
};

export default issuesState;
