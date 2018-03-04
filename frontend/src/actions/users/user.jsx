import actionTypes from '../actionTypes';

const storeUser = user => ({
  type: actionTypes.user.USER_STORE,
  payload: {
    user,
  },
});

const updateUser = (id, user) => ({
  type: actionTypes.user.USER_UPDATE,
  payload: {
    id,
    user,
  },
});

const removeUser = id => ({
  type: actionTypes.user.USER_REMOVE,
  payload: {
    id,
  },
});

export default {
  storeUser,
  updateUser,
  removeUser,
};
