import request from '../utils/request';

const ROLES_FETCH = 'users/authorities';

const fetchRoles = () => request.get(ROLES_FETCH);

export default {
  fetchRoles,
};
