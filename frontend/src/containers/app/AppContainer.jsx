import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../../components/app/app';

import actions from '../../actions';

const mapStateToProps = state => ({
  isAuthenticated: state.app.isAuthenticated,
  isChecking: state.app.isChecking,
  isActiveRequest: state.app.isActiveRequest,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(actions.app, dispatch),
  userActions: bindActionCreators(actions.user, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
