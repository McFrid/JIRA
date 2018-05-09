import { combineReducers } from 'redux';
import users from './users';
import roles from './roles';
import account from './account';
import app from './app';
import products from './products';
import stories from './stories';
import issues from './issues';

export default combineReducers({
  users,
  roles,
  account,
  app,
  products,
  stories,
  issues,
});
