import actionTypes from '../actions/actionTypes';

const initState = {
  items: [],
  isFetching: false,
  isLoaded: false,
  isCountFetching: false,
  isCountLoaded: false,
  isError: false,
  count: 0,
};

const userState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.user.USER_STORE:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload.user,
        ],
        count: state.count + 1,
      };

    case actionTypes.user.USER_UPDATE:
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.payload.user.id) {
            return {
              ...action.payload.user,
            };
          }

          return user;
        }),
      };

    case actionTypes.user.USER_REMOVE:
      return {
        ...state,
        items: state.items.filter(user => user.login !== action.payload.login),
        count: state.count - 1,
      };

    case actionTypes.users.USERS_FETCH:
      return {
        ...state,
        items: [],
        isFetching: true,
        isLoaded: false,
      };

    case actionTypes.users.USERS_STORE:
      return {
        ...state,
        items: action.payload.users,
        isFetching: false,
        isLoaded: true,
      };

    case actionTypes.user.USER_REQUEST:
      return {
        ...state,
        isError: false,
      };

    case actionTypes.user.USER_REQUEST_ERROR:
      return {
        ...state,
        isError: true,
      };

    case actionTypes.users.USERS_COUNT_FETCH:
      return {
        ...state,
        isCountFetching: true,
        isCountLoaded: false,
      };

    case actionTypes.users.USERS_COUNT_STORE:
      return {
        ...state,
        isCountFetching: false,
        isCountLoaded: true,
        count: action.payload.count,
      };

    default:
      return state;
  }
};

export default userState;
