import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import UsersMainPage from '../../components/users/UsersMainPage';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';
import awaitedUserActionsDecorator from '../../utils/decorators/awaitedUserActionsDecorator';

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
    dispatch(awaitedRequestDecorator(awaitedUserActionsDecorator(actions.user.storeUser(user))));
  },
  updateUser: (id, user) => {
    dispatch(awaitedRequestDecorator(awaitedUserActionsDecorator(actions.user.updateUser(
      id,
      user,
    ))));
  },
  removeUser: (id) => {
    dispatch(awaitedRequestDecorator(actions.user.removeUser(id)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersMainPage);
