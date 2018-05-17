import request from '../utils/request';

const USERS_BASE = 'users';

const fetchUsers = () => request.get(USERS_BASE);

const fetchUsersPage = (page, size) => request.get(`${USERS_BASE}`, {
  page,
  size,
});


const saveUser = user => request.post(USERS_BASE, user);

const updateUser = user => request.put(USERS_BASE, user);

const removeUser = login => request.delete(`${USERS_BASE}/${login}`);

const fetchUsersCount = () => request.get(`${USERS_BASE}/count`);

const removeMultipleUsers = ids => request.delete(`${USERS_BASE}`, ids);

export default {
  fetchUsers,
  fetchUsersPage,
  saveUser,
  updateUser,
  removeUser,
  fetchUsersCount,
  removeMultipleUsers,
};
