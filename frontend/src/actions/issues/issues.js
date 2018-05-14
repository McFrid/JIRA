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

const fetchIssuesPage = (page, size) => async (dispatch) => {
  dispatch({
    type: actionTypes.issues.ISSUES_FETCH,
  });

  try {
    const issues = await issuesService.fetchIssuesPage(page, size);
    dispatch(storeIssues(issues.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

const fetchIssuesCount = () => async (dispatch) => {
  dispatch({
    type: actionTypes.issues.ISSUES_COUNT_FETCH,
  });

  try {
    const issuesCount = await issuesService.fetchIssuesCount();
    dispatch({
      type: actionTypes.issues.ISSUES_COUNT_STORE,
      payload: {
        count: issuesCount.data,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

export default {
  fetchIssues,
  fetchIssuesPage,
  fetchIssuesCount,
};
