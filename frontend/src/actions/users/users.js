import actionTypes from '../actionTypes';

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

  const users = await usersService.fetchUsers();

  dispatch(storeUsers(users));
};

export default {
  fetchUsers,
};
