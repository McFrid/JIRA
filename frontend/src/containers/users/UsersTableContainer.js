import { connect } from 'react-redux';
import UsersTable from '../../components/users/UsersTable';

const mapState = state => ({
  users: state.users,
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(UsersTable);