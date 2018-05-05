import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import Login from '../../components/login/Login';

const mapStateToProps = state => ({
  account: state.account.data,
  isLoaded: state.account.isLoaded,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(actions.user, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
