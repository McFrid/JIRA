import { combineReducers } from 'redux';
import users from './users';
import roles from './roles';
import account from './account';
import app from './app';

export default combineReducers({
  users,
  roles,
  account,
  app,
});
