import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import UsersMainPage from '../../components/users/UsersMainPage';

const mapStateToProps = state => ({
  users: state.users.items,
  roles: state.roles.items,
  areUsersFetching: state.users.isFetching,
  areUsersLoaded: state.users.isLoaded,
  areRolesLoaded: state.roles.areLoaded,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(actions.user, dispatch),
  usersActions: bindActionCreators(actions.users, dispatch),
  rolesActions: bindActionCreators(actions.roles, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersMainPage);
