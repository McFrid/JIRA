import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import UsersMainPage from '../../components/users/UsersMainPage';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';
import awaitedUserActionsDecorator from '../../utils/decorators/awaitedUserActionsDecorator';
import notificationDecorator from '../../utils/decorators/notificationDecorator';

const mapStateToProps = state => ({
  users: state.users.items,
  roles: state.roles.items,
  products: state.products.items,
  issues: state.issues.items,
  areUsersFetching: state.users.isFetching,
  areUsersLoaded: state.users.isLoaded,
  areProductsLoaded: state.products.areLoaded,
  areProductsFetching: state.products.areFetching,
  areIssuesLoaded: state.issues.areLoaded,
  areIssuesFetching: state.issues.areFetching,
  isUsersError: state.users.isError,
  areRolesLoaded: state.roles.areLoaded,
  isActiveRequest: state.app.isActiveRequest,
  isCountLoaded: state.users.isCountLoaded,
  isCountFetching: state.users.isCountFetching,
  total: state.users.count,
});

const mapDispatchToProps = dispatch => ({
  usersActions: bindActionCreators(actions.users, dispatch),
  rolesActions: bindActionCreators(actions.roles, dispatch),
  productsActions: bindActionCreators(actions.products, dispatch),
  issuesActions: bindActionCreators(actions.issues, dispatch),
  storeUser: user =>
    dispatch(awaitedRequestDecorator(awaitedUserActionsDecorator(notificationDecorator(
      actions.user.storeUser(user),
      'Successfully added user',
      'There is an input error in field(s)',
    )))),
  updateUser: (id, user) =>
    dispatch(awaitedRequestDecorator(awaitedUserActionsDecorator(notificationDecorator(
      actions.user.updateUser(id, user),
      'Successfully updated user',
      'There is an input error in field(s)',
    )))),
  removeUser: login =>
    dispatch(awaitedRequestDecorator(awaitedUserActionsDecorator(notificationDecorator(
      actions.user.removeUser(login),
      'Successfully removed user',
      'The user is connected to some other entity',
    )))),
  removeMultipleUsers: ids =>
    dispatch(awaitedRequestDecorator(awaitedUserActionsDecorator(notificationDecorator(
      actions.users.removeUsers(ids),
      'Successfully removed users',
      'Some user is connected to an other entity',
    )), true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersMainPage);
