import request from '../utils/request';

const USERS_BASE = 'users';

const fetchUsers = () => request.get(USERS_BASE);

const saveUser = user => request.post(USERS_BASE, user);

const updateUser = user => request.put(USERS_BASE, user);

const removeUser = login => request.delete(`${USERS_BASE}/${login}`);

export default {
  fetchUsers,
  saveUser,
  updateUser,
  removeUser,
};
