import actionTypes from '../actions/actionTypes';

const initState = {
  items: [],
  isFetching: false,
  isLoaded: false,
  isError: false,
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
      };

    case actionTypes.user.USER_UPDATE:
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...action.payload.user,
              id: action.payload.id,
            };
          }

          return user;
        }),
      };

    case actionTypes.user.USER_REMOVE:
      return {
        ...state,
        items: state.items.filter(user => user.id !== action.payload.id),
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

    default:
      return state;
  }
};

export default userState;
