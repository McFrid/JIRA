import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/index';

import UsersMainPage from '../../components/users/UsersMainPage';

const mapState = state => ({
  users: state.users.items,
  roles: state.roles.items,
  areUsersFetching: state.users.isFetching,
  areUsersLoaded: state.users.isLoaded,
  areRolesLoaded: state.roles.areLoaded,
});

const mapDispatch = dispatch => ({
  userActions: bindActionCreators(actions.user, dispatch),
  usersActions: bindActionCreators(actions.users, dispatch),
  rolesActions: bindActionCreators(actions.roles, dispatch),
});

export default connect(mapState, mapDispatch)(UsersMainPage);
