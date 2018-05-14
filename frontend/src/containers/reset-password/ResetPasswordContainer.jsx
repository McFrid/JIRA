import { connect } from 'react-redux';

import actions from '../../actions';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';

import ResetPasswordPage from '../../components/reset-password/ResetPasswordPage';
import notificationDecorator from '../../utils/decorators/notificationDecorator';

const mapStateToProps = state => ({
//   account: state.account.data,
//   isLoaded: state.account.isLoaded,
});

const mapDispatchToProps = dispatch => ({
//   login: (userName, password) => {
//     dispatch(awaitedRequestDecorator(notificationDecorator(
//       actions.user.login(userName, password),
//       null,
//       'Invalid username or password',
//     )));
//   },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
