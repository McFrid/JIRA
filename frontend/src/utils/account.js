/* global localStorage */
/* eslint no-undef: "error" */

const ACCOUNT_ID = 'account-id';
const ACCOUNT_USERNAME = 'account-username';

const getAccountId = () => localStorage.getItem(ACCOUNT_ID);

const setAccountId = (id) => {
  localStorage.setItem(ACCOUNT_ID, id);
};

const getAccountUsername = () => localStorage.getItem(ACCOUNT_USERNAME);

const setAccountUsername = (name) => {
  localStorage.setItem(ACCOUNT_USERNAME, name);
};

const removeAccount = () => {
  localStorage.removeItem(ACCOUNT_ID);
  localStorage.removeItem(ACCOUNT_USERNAME);
};

export default {
  getAccountId,
  setAccountId,
  getAccountUsername,
  setAccountUsername,
  removeAccount,
};
