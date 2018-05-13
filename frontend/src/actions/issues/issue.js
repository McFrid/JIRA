import actionTypes from '../actionTypes';

import issuesService from '../../services/issues-service';

const storeIssue = issue => async (dispatch) => {
  const response = await issuesService.saveIssue(issue);

  dispatch({
    type: actionTypes.issue.ISSUE_STORE,
    payload: {
      issue: {
        ...response.data,
      },
    },
  });
};

const updateIssue = (id, issue) => async (dispatch) => {
  const response = await issuesService.updateIssue({
    ...issue,
    id,
  });

  dispatch({
    type: actionTypes.issue.ISSUE_UPDATE,
    payload: {
      issue: response.data,
    },
  });
};

const removeIssue = id => async (dispatch) => {
  try {
    await issuesService.removeIssue(id);

    dispatch({
      type: actionTypes.issue.ISSUE_REMOVE,
      payload: {
        id,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export default {
  storeIssue,
  updateIssue,
  removeIssue,
};
