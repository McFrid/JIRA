import actionTypes from '../actionTypes';

import accountService from '../../services/account-service';
import auth from '../../utils/auth';
import account from '../../utils/account';

const storeUser = user => ({
  type: actionTypes.user.USER_STORE,
  payload: {
    user,
  },
});

const updateUser = (id, user) => ({
  type: actionTypes.user.USER_UPDATE,
  payload: {
    id,
    user,
  },
});

const removeUser = id => ({
  type: actionTypes.user.USER_REMOVE,
  payload: {
    id,
  },
});

const fetchAccount = () => ({
  type: actionTypes.account.ACCOUNT_FETCH,
});

const saveAccountDetails = details => ({
  type: actionTypes.account.ACCOUNT_SAVE,
  payload: {
    account: details,
  },
});

const fetchAccountError = () => ({
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
  } catch (error) {
    dispatch(fetchAccountError());
    auth.logout();
  }
};

export default {
  storeUser,
  updateUser,
  removeUser,
  login,
};
