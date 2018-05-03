/* global localStorage */
/* eslint no-undef: "error" */

const TOKEN = 'access-token';

const setAccessToken = (val) => {
  localStorage.setItem(TOKEN, val);
};

const login = (val) => {
  setAccessToken(val);
};

const logout = () => {
  localStorage.removeItem(TOKEN);
};

const getAccessToken = () => localStorage.getItem(TOKEN);

const isAuthorized = () => getAccessToken() !== null;

export default {
  login,
  logout,
  isAuthorized,
  getAccessToken,
};
