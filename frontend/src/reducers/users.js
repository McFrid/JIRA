import actionTypes from '../actions/actionTypes';

const initState = {
  items: [{
    id: 1,
    email: 'test@google.com',
    firstName: 'Firts Name 1',
    lastName: 'Last Name 1',
    experience: 1.2,
  }, {
    id: 2,
    email: 'test2@google.com',
    firstName: 'Firts Name 2',
    lastName: 'Last Name 2',
    experience: 2.2,
  }],
  isFetching: false,
  isLoaded: false,
};

const userState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.user.USER_STORE:
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload.user,
            id: Math.random(),
            experience: Number.parseFloat(action.payload.user.experience),
          },
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
              experience: Number.parseFloat(action.payload.user.experience),
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
        isFetching: true,
        isLoaded: false,
      };

    case actionTypes.users.USERS_STORE:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
      };

    default:
      return state;
  }
};

export default userState;
