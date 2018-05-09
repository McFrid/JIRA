import request from '../utils/request';

const ISSUES_BASE = 'issues';

const fetchIssues = () => request.get(ISSUES_BASE);

const saveIssue = issue => request.post(ISSUES_BASE, issue);

const updateIssue = issue => request.put(ISSUES_BASE, issue);

const removeIssue = id => request.delete(`${ISSUES_BASE}/${id}`);

export default {
  fetchIssues,
  saveIssue,
  updateIssue,
  removeIssue,
};
