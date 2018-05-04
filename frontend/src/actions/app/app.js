import actionTypes from '../actionTypes';

const setAuthenticated = isAuthenticated => ({
  type: actionTypes.app.APP_AUTHENTICATED_SET,
  payload: {
    isAuthenticated,
  },
});

const setAuthenticationError = () => ({
  type: actionTypes.app.APP_AUTHENTICATION_ERROR,
});

export default {
  setAuthenticated,
  setAuthenticationError,
};
