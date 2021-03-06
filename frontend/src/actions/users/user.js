import actionTypes from '../actionTypes';

import accountService from '../../services/account-service';
import auth from '../../utils/auth';
import account from '../../utils/account';

import actions from '../index';

import toastr from 'toastr';

import usersService from '../../services/users-service';

const storeUser = user => async (dispatch) => {
  const response = await usersService.saveUser(user);

  dispatch({
    type: actionTypes.user.USER_STORE,
    payload: {
      user: {
        ...response.data,
        authority: user.authority,
      },
    },
  });
};

const updateUser = (id, user) => async (dispatch) => {
  const response = await usersService.updateUser({
    ...user,
    id,
  });

  dispatch({
    type: actionTypes.user.USER_UPDATE,
    payload: {
      user: response.data,
    },
  });
};

const removeUser = login => async (dispatch) => {
  await usersService.removeUser(login);

  dispatch({
    type: actionTypes.user.USER_REMOVE,
    payload: {
      login,
    },
  });
};

const fetchAccount = () => ({
  type: actionTypes.account.ACCOUNT_FETCH,
});

const saveAccountDetails = details => ({
  type: actionTypes.account.ACCOUNT_SAVE,
  payload: {
    account: details,
  },
});

const setAccountFetchError = () => ({
  type: actionTypes.account.ACCOUNT_FETCH_ERROR,
});

const login = (username, password) => async (dispatch) => {
  dispatch(fetchAccount());

  try {
    const token = await accountService.login(username, password);
    auth.login(token.data.id_token);

    const accountDetails = await accountService.getAccountDetails();
    dispatch(saveAccountDetails(accountDetails));

    account.setAccountId(accountDetails.data.id);
    account.setAccountUsername(accountDetails.data.login);
    account.setAccountRole(accountDetails.data.authority);

    dispatch(actions.app.setAuthenticatedState(true));
  } catch (error) {
    dispatch(setAccountFetchError());
    auth.logout();
    throw error;
  }
};

const resetPassword = (key, password) => async (dispatch) => {
  await accountService.resetPassword(key, password);
};

const logout = () => (dispatch) => {
  auth.logout();
  account.removeAccount();
  dispatch(actions.app.setAuthenticatedState(false));
  toastr.info('Logged out successfully');
};

export default {
  storeUser,
  updateUser,
  removeUser,
  resetPassword,
  login,
  logout,
};
