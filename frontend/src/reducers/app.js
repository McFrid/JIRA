import actionTypes from '../actions/actionTypes';

const initState = {
  isAuthenticated: false,
  isChecking: true,
  doesAuthenticationErrorExist: false,
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

    default:
      return state;
  }
};

export default appState;
