import actionTypes from '../actions/actionTypes';

const initState = {
  isAuthenticated: false,
  isChecking: true,
  isAuthenticationError: false,
};

const appState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.app.APP_AUTHENTICATED_SET:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isChecking: false,
        isAuthenticationError: false,
      };

    case actionTypes.app.APP_AUTHENTICATION_ERROR:
      return {
        ...state,
        isAuthenticationError: true,
      };

    default:
      return state;
  }
};

export default appState;
