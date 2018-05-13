import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import IssuesMainPage from '../../components/issues/IssuesMainPage';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';
import awaitedIssueActionsDecorator from '../../utils/decorators/awaitedIssueActionsDecorator';
import notificationDecorator from '../../utils/decorators/notificationDecorator';

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
    dispatch(awaitedRequestDecorator(awaitedIssueActionsDecorator(notificationDecorator(
      actions.issue.storeIssue(issue),
      'Successfully added issue',
      'There is an input error in field(s)',
    ))));
  },
  updateIssue: (id, issue) => {
    dispatch(awaitedRequestDecorator(awaitedIssueActionsDecorator(notificationDecorator(
      actions.issue.updateIssue(id, issue),
      'Successfully updated issue',
      'There is an input error in field(s)',
    ))));
  },
  removeIssue: (id) => {
    dispatch(awaitedRequestDecorator(notificationDecorator(
      actions.issue.removeIssue(id),
      'Successfully removed issue',
      'The issue is connected to some other entity',
    )));
  },
  storeSolution: solution => dispatch(actions.solution.storeSolution(solution)),
  updateSolution: (id, solution) => dispatch(actions.solution.updateSolution(id, solution)),
  removeSolution: id => dispatch(actions.solution.removeSolution(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuesMainPage);
