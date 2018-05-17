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

const fetchIssuesPageByLogin = (login, page, size) => async (dispatch) => {
  dispatch({
    type: actionTypes.issues.ISSUES_FETCH,
  });

  try {
    const issues = await issuesService.fetchIssuesPageByLogin(login, page, size);
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

const fetchIssuesCountByLogin = login => async (dispatch) => {
  dispatch({
    type: actionTypes.issues.ISSUES_COUNT_FETCH,
  });

  try {
    const issuesCount = await issuesService.fetchIssuesCountByLogin(login);
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
  fetchIssuesPageByLogin,
  fetchIssuesCount,
  fetchIssuesCountByLogin,
};
