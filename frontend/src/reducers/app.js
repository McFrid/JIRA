import actionTypes from '../actions/actionTypes';

const initState = {
  isAuthenticated: false,
  isChecking: true,
  doesAuthenticationErrorExist: false,
  isActiveRequest: false,
};

const appState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.app.APP_SET_AUTHENTICATED_STATE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isChecking: false,
        doesAuthenticationErrorExist: false,
      };

    case actionTypes.app.APP_AUTHENTICATION_ERROR:
      return {
        ...state,
        doesAuthenticationErrorExist: true,
      };

    case actionTypes.app.APP_REQUEST:
      return {
        ...state,
        isActiveRequest: true,
      };

    case actionTypes.app.APP_REQUEST_COMPLETED:
      return {
        ...state,
        isActiveRequest: false,
      };

    default:
      return state;
  }
};

export default appState;
