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
  areUsersFetching: state.users.isFetching,
  areUsersLoaded: state.users.isLoaded,
  isUsersError: state.users.isError,
  areRolesLoaded: state.roles.areLoaded,
  isActiveRequest: state.app.isActiveRequest,
});

const mapDispatchToProps = dispatch => ({
  usersActions: bindActionCreators(actions.users, dispatch),
  rolesActions: bindActionCreators(actions.roles, dispatch),
  storeUser: (user) => {
    dispatch(awaitedRequestDecorator(awaitedUserActionsDecorator(notificationDecorator(
      actions.user.storeUser(user),
      'Successfully added user',
      'There is an input error in field(s)',
    ))));
  },
  updateUser: (id, user) => {
    dispatch(awaitedRequestDecorator(awaitedUserActionsDecorator(notificationDecorator(
      actions.user.updateUser(id, user),
      'Successfully updated user',
      'There is an input error in field(s)',
    ))));
  },
  removeUser: (login) => {
    dispatch(awaitedRequestDecorator(notificationDecorator(
      actions.user.removeUser(login),
      'Successfully removed user',
    )));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersMainPage);
