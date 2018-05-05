import actionTypes from '../actions/actionTypes';

const initState = {
  data: null,
  isFetching: false,
  isLoaded: false,
};

const userState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.account.ACCOUNT_FETCH:
      return {
        ...state,
        data: null,
        isFetching: true,
        isLoaded: false,
      };

    case actionTypes.account.ACCOUNT_SAVE:
      return {
        ...state,
        data: action.payload.account,
        isFetching: false,
        isLoaded: true,
      };

    case actionTypes.account.ACCOUNT_FETCH_ERROR:
      return {
        ...state,
        data: null,
        isFetching: false,
        isLoaded: false,
      };

    default:
      return state;
  }
};

export default userState;
