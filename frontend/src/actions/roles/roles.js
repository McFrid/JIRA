import actionTypes from '../actionTypes';
import rolesService from '../../services/roles-service';

const storeRoles = roles => ({
  type: actionTypes.roles.ROLES_STORE,
  payload: {
    roles,
  },
});

const fetchRoles = () => async (dispatch) => {
  dispatch({
    type: actionTypes.roles.ROLES_FETCH,
  });

  const roles = await rolesService.fetchRoles();

  dispatch(storeRoles(roles));
};

export default {
  fetchRoles,
};
