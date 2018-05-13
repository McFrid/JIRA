/* global localStorage */
/* eslint no-undef: "error" */

const ACCOUNT_ID = 'account-id';
const ACCOUNT_USERNAME = 'account-username';
const ACCOUNT_ROLE = 'account-role';

const getAccountId = () => localStorage.getItem(ACCOUNT_ID);

const setAccountId = (id) => {
  localStorage.setItem(ACCOUNT_ID, id);
};

const getAccountUsername = () => localStorage.getItem(ACCOUNT_USERNAME);

const setAccountUsername = (name) => {
  localStorage.setItem(ACCOUNT_USERNAME, name);
};

const getAccountRole = () => localStorage.getItem(ACCOUNT_ROLE);

const setAccountRole = (role) => {
  localStorage.setItem(ACCOUNT_ROLE, role);
};

const removeAccount = () => {
  localStorage.removeItem(ACCOUNT_ID);
  localStorage.removeItem(ACCOUNT_USERNAME);
  localStorage.removeItem(ACCOUNT_ROLE);
};

export default {
  getAccountId,
  setAccountId,
  getAccountUsername,
  setAccountUsername,
  getAccountRole,
  setAccountRole,
  removeAccount,
};
