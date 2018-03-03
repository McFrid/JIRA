import actionTypes from '../actionTypes';

const storeUser = user => ({
  type: actionTypes.user.USER_STORE,
  payload: {
    user,
  }
});

export default {
  storeUser,
};
