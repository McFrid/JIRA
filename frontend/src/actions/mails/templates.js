import actionTypes from '../actionTypes';
import actions from '../index';
import emailsService from '../../services/emails-service';

const storeTemplates = templates => ({
  type: actionTypes.templates.TEMPLATES_STORE,
  payload: {
    templates,
  },
});

const fetchTemplates = () => async (dispatch) => {
  dispatch({
    type: actionTypes.templates.TEMPLATES_FETCH,
  });

  try {
    const templates = await emailsService.fetchTemplates();
    dispatch(storeTemplates(templates.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

export default {
  fetchTemplates,
};
