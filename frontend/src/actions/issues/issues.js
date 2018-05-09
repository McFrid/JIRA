import actionTypes from '../actionTypes';
import actions from '../index';
import issuesService from '../../services/issues-service';

const storeIssues = issues => ({
  type: actionTypes.issues.ISSUES_STORE,
  payload: {
    issues,
  },
});

const fetchIssues = () => async (dispatch) => {
  dispatch({
    type: actionTypes.issues.ISSUES_FETCH,
  });

  try {
    const issues = await issuesService.fetchIssues();
    dispatch(storeIssues(issues.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

export default {
  fetchIssues,
};
