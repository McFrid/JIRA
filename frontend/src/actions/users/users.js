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

export default {
  fetchUsers,
};
