import React from 'react';
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../../components/app/app';
// import * as appActions from '../../actions/app/app'

const AppContainer = () => (
  <App />
);

const mapStateToProps = state => ({
  app: state.app,
});

// const mapDispatchToProps = dispatch => ({
//   // appActions: bindActionCreators(appActions, dispatch)
// });

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppContainer));
export default connect(mapStateToProps)(withRouter(AppContainer));
