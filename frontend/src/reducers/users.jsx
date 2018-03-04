import actionTypes from '../actions/actionTypes';

const initState = [{
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
}];

const userState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.user.USER_STORE:
      return [
        ...state,
        {
          ...action.payload.user,
          id: Math.random(),
          experience: Number.parseFloat(action.payload.user.experience),
        },
      ];

    case actionTypes.user.USER_UPDATE:
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...action.payload.user,
            id: action.payload.id,
            experience: Number.parseFloat(action.payload.user.experience),
          };
        }

        return user;
      });

    case actionTypes.user.USER_REMOVE:
      return state.filter(user => user.id !== action.payload.id);

    default:
      return state;
  }
};

export default userState;
