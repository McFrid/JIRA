import actionTypes from '../actionTypes';

const setAuthenticatedState = isAuthenticated => ({
  type: actionTypes.app.APP_SET_AUTHENTICATED_STATE,
  payload: {
    isAuthenticated,
  },
});

const setAuthenticationError = () => ({
  type: actionTypes.app.APP_AUTHENTICATION_ERROR,
});

export default {
  setAuthenticatedState,
  setAuthenticationError,
};
