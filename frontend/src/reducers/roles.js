import actionTypes from '../actions/actionTypes';

const mockState = {
  items: [{
    id: 1,
    name: 'Administrator'
  }, {
    id: 2,
    name: 'Customer'
  }, {
    id: 3,
    name: 'Manager'
  }, {
    id: 4,
    name: 'Developer'
  }],
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
      };

    default:
      return state;
  }
};

export default rolesState;