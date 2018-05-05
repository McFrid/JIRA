import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../../components/app/app';

import actions from '../../actions';

const mapStateToProps = state => ({
  isAuthenticated: state.app.isAuthenticated,
  isChecking: state.app.isChecking,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(actions.app, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
