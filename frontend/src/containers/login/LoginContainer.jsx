import { connect } from 'react-redux';
import actions from '../../actions';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';

import Login from '../../components/login/Login';

const mapStateToProps = state => ({
  account: state.account.data,
  isLoaded: state.account.isLoaded,
});

const mapDispatchToProps = dispatch => ({
  login: (userName, password) => {
    dispatch(awaitedRequestDecorator(actions.user.login(userName, password)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
