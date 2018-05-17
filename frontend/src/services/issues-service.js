import request from '../utils/request';

const ISSUES_BASE = 'issues';

const fetchIssues = () => request.get(ISSUES_BASE);

const fetchIssuesPage = (page, size) => request.get(`${ISSUES_BASE}`, {
  page,
  size,
});

const fetchIssuesPageByLogin = (login, page, size) => request.get(`${ISSUES_BASE}`, {
  login,
  page,
  size,
});

const saveIssue = issue => request.post(ISSUES_BASE, issue);

const updateIssue = issue => request.put(ISSUES_BASE, issue);

const removeIssue = id => request.delete(`${ISSUES_BASE}/${id}`);

const fetchIssuesCount = () => request.get(`${ISSUES_BASE}/count`);

const fetchIssuesCountByLogin = login => request.get(`${ISSUES_BASE}/count`, {
  login,
});

export default {
  fetchIssues,
  fetchIssuesPage,
  fetchIssuesPageByLogin,
  saveIssue,
  updateIssue,
  removeIssue,
  fetchIssuesCount,
  fetchIssuesCountByLogin,
};
