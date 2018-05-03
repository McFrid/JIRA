import { combineReducers } from 'redux';
import users from './users';
import roles from './roles';
import account from './account';

export default combineReducers({
  users,
  roles,
  account,
});
