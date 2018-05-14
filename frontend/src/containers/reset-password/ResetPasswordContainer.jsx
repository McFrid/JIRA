import { connect } from 'react-redux';

import actions from '../../actions';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';

import ResetPasswordPage from '../../components/reset-password/ResetPasswordPage';
import notificationDecorator from '../../utils/decorators/notificationDecorator';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  resetPassword: (key, password) => {
    dispatch(awaitedRequestDecorator(notificationDecorator(
      actions.user.resetPassword(key, password),
      'Changed password successfully',
      'Invalid reset password key',
    )));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
