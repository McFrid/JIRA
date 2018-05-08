import actionTypes from '../actions/actionTypes';

const mockState = {
  items: [],
  areLoaded: false,
};

const rolesState = (state = mockState, action) => {
  switch (action.type) {
    case actionTypes.roles.ROLES_FETCH:
      return {
        ...state,
        areLoaded: false,
      };

    case actionTypes.roles.ROLES_STORE:
      return {
        ...state,
        areLoaded: true,
        items: action.payload.roles,
      };

    default:
      return state;
  }
};

export default rolesState;
