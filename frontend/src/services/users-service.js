import request from '../utils/request';

const USERS_FETCH = 'users';
const USER_SAVE = 'users';

const fetchUsers = () => request.get(USERS_FETCH);

const saveUser = user => request.post(USER_SAVE, user);

export default {
  fetchUsers,
  saveUser,
};
