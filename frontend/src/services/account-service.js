import request from '../utils/request';

const LOGIN_ROUTE = 'authenticate';
const ACCOUNT_DETAILS = 'account';

const login = (username, password) => request.post(LOGIN_ROUTE, {
  username,
  password,
  rememberMe: true,
});

const getAccountDetails = () => request.get(ACCOUNT_DETAILS);

export default {
  login,
  getAccountDetails,
};
