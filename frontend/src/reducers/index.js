import { combineReducers } from 'redux';
import users from './users';
import roles from "./roles";

export default combineReducers({
  users,
  roles,
});
