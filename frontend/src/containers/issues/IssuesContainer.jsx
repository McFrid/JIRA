import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import IssuesMainPage from '../../components/issues/IssuesMainPage';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';
import awaitedIssueActionsDecorator from '../../utils/decorators/awaitedIssueActionsDecorator';

const mapStateToProps = state => ({
  issues: state.issues.items,
  stories: state.stories.items,
  users: state.users.items,
  solutions: state.solutions.items,
  areIssuesFetching: state.issues.areFetching,
  areIssuesLoaded: state.issues.areLoaded,
  areStoriesFetching: state.stories.areFetching,
  areStoriesLoaded: state.stories.areLoaded,
  areUsersFetching: state.users.isFetching,
  areUsersLoaded: state.users.isLoaded,
  areSolutionsFetching: state.solutions.areFetching,
  areSolutionsLoaded: state.solutions.areLoaded,
  isIssuesError: state.issues.isError,
  isSolutions: state.solutions.isError,
  isActiveRequest: state.app.isActiveRequest,
});

const mapDispatchToProps = dispatch => ({
  storiesActions: bindActionCreators(actions.stories, dispatch),
  issuesActions: bindActionCreators(actions.issues, dispatch),
  usersActions: bindActionCreators(actions.users, dispatch),
  solutionsActions: bindActionCreators(actions.solutions, dispatch),
  storeIssue: (issue) => {
    dispatch(awaitedRequestDecorator(awaitedIssueActionsDecorator(actions.issue.storeIssue(issue))));
  },
  updateIssue: (id, issue) => {
    dispatch(awaitedRequestDecorator(awaitedIssueActionsDecorator(actions.issue.updateIssue(
      id,
      issue,
    ))));
  },
  removeIssue: (id) => {
    dispatch(awaitedRequestDecorator(actions.issue.removeIssue(id)));
  },
  storeSolution: solution => dispatch(actions.solution.storeSolution(solution)),
  updateSolution: (id, solution) => dispatch(actions.solution.updateSolution(id, solution)),
  removeSolution: id => dispatch(actions.solution.removeSolution(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuesMainPage);
