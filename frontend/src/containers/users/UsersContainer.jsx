import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/index';

import UsersMainPage from '../../components/users/UsersMainPage';

const mapState = state => ({
  users: state.users.items,
  isFetching: state.users.isFetching,
  isLoaded: state.users.isLoaded,
});

const mapDispatch = dispatch => ({
  userActions: bindActionCreators(actions.user, dispatch),
  usersActions: bindActionCreators(actions.users, dispatch),
});

export default connect(mapState, mapDispatch)(UsersMainPage);
