import actionTypes from '../actionTypes';
import actions from '../index';
import usersService from '../../services/users-service';

const storeUsers = users => ({
  type: actionTypes.users.USERS_STORE,
  payload: {
    users,
  },
});

const fetchUsers = () => async (dispatch) => {
  dispatch({
    type: actionTypes.users.USERS_FETCH,
  });

  try {
    const users = await usersService.fetchUsers();
    dispatch(storeUsers(users.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

const fetchUsersPage = (page, size) => async (dispatch) => {
  dispatch({
    type: actionTypes.users.USERS_FETCH,
  });

  try {
    const users = await usersService.fetchUsersPage(page, size);
    dispatch(storeUsers(users.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

const fetchUsersCount = () => async (dispatch) => {
  dispatch({
    type: actionTypes.users.USERS_COUNT_FETCH,
  });

  try {
    const usersCount = await usersService.fetchUsersCount();
    dispatch({
      type: actionTypes.users.USERS_COUNT_STORE,
      payload: {
        count: usersCount.data,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

const removeUsers = ids => async (dispatch) => {
  try {
    await usersService.removeMultipleUsers(ids);

    dispatch({
      type: actionTypes.users.USERS_REMOVE,
      payload: {
        ids,
      }
    });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }

    throw error;
  }
}


export default {
  fetchUsers,
  fetchUsersPage,
  fetchUsersCount,
  removeUsers,
};
