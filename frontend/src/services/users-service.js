import request from '../utils/request';

const USERS_FETCH = 'users';

const fetchUsers = () => request.get(USERS_FETCH);

export default {
  fetchUsers,
};
