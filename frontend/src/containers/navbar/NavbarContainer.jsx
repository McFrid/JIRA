import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import NavigationBar from '../../components/common/NavigationBar';
import awaitedRequestDecorator from '../../utils/decorators/awaitedRequestDecorator';
import awaitedEmailActionsDecorator from '../../utils/decorators/awaitedEmailActionsDecorator';
import notificationDecorator from '../../utils/decorators/notificationDecorator';

const mapStateToProps = state => ({
  users: state.users.items,
  templates: state.emails.templates,
  areUsersFetching: state.users.isFetching,
  areUsersLoaded: state.users.isLoaded,
  areTemplatesFetching: state.emails.isFetching,
  areTemplatesLoaded: state.emails.isLoaded,
  isActiveRequest: state.app.isActiveRequest,

});

const mapDispatchToProps = dispatch => ({
  usersActions: bindActionCreators(actions.users, dispatch),
  templatesActions: bindActionCreators(actions.templates, dispatch),
  sendEmail: (mail, template) =>
    dispatch(awaitedRequestDecorator(awaitedEmailActionsDecorator(notificationDecorator(
      actions.email.sendEmail(mail, template),
      'Successfully sent mail',
      'There is an input error in field(s)',
    )))),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
