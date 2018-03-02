import { connect } from 'react-redux';
import UsersMainPage from '../../components/users/UsersMainPage';

const mapState = state => ({
  users: state.users,
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(UsersMainPage);