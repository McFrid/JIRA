import { connect } from 'react-redux';
import actions from '../../actions';
import requestDecorator from '../../utils/requestDecorator';

import Login from '../../components/login/Login';

const mapStateToProps = state => ({
  account: state.account.data,
  isLoaded: state.account.isLoaded,
});

const mapDispatchToProps = dispatch => ({
  login: (userName, password) => {
    dispatch(requestDecorator(actions.user.login(userName, password)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
