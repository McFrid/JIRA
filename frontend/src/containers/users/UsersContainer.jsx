import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/index';

import UsersMainPage from '../../components/users/UsersMainPage';

const mapState = state => ({
  users: state.users,
});

const mapDispatch = dispatch => ({
  userActions: bindActionCreators(actions.user, dispatch),
});

export default connect(mapState, mapDispatch)(UsersMainPage);
