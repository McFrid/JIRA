import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import toastr from 'toastr';

import DataModal from './DataModal';

import account from '../../utils/account';
import LabelMultiSelect from './LabelMultiSelect';
import LabelDropdown from './LabelDropdown';

const ROLE_ADMIN = 'ROLE_ADMIN';

class NavigationBar extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};

    if (!nextProps.isActiveRequest && prevState.isActiveRequest) {
      if (!nextProps.isProductsError) {
        newState = {
          ...newState,
          name: '',
          users: [],
          isTemplate: false,
          template: null,
          mail: '',
          title: '',
          isActiveModal: false,
        };
      }

      newState = {
        ...newState,
        isActiveRequest: false,
      };
    }

    return newState;
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onUsersChange = this.onUsersChange.bind(this);
    this.onSendMailClick = this.onSendMailClick.bind(this);
    this.onCancelSendMail = this.onCancelSendMail.bind(this);
    this.onChangeIsTemplate = this.onChangeIsTemplate.bind(this);
    this.onTemplateChange = this.onTemplateChange.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangeEmailTitle = this.onChangeEmailTitle.bind(this);
    this.onSendMail = this.onSendMail.bind(this);

    this.state = {
      isOpen: false,
      isActiveModal: false,
      users: [],
      isTemplate: false,
      template: null,
      mail: '',
      title: '',
      isActiveRequest: false,
    };
  }

  componentDidMount() {
    this.props.usersActions.fetchUsers();
    this.props.templatesActions.fetchTemplates();
  }

  onSendMailClick(e) {
    e.preventDefault();

    this.setState({
      isActiveModal: true,
      users: [],
      isTemplate: false,
      mailValue: false,
      template: this.props.templates.find(template => template),
      mail: '',
      title: '',
    });
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  onTogleModal() {
    this.setState({
      isActiveModal: true,
    });
  }

  onSendMail() {
    if (!this.state.title || (this.state.isTemplate && !this.state.template) ||
      (!this.state.isTemplate && !this.state.mail) || !this.state.users.length) {
      return toastr.warning('You should fill all required fields');
    }

    this.setState({
      isActiveRequest: true,
    });

    this.props.sendEmail({
      message: this.state.mail,
      title: this.state.title,
      userIds: this.state.users.map(user => user.id),
    }, this.state.isTemplate ? this.state.template : null);
  }

  onCancelSendMail() {
    this.setState({
      isActiveModal: false,
    });
  }

  onUsersChange(event) {
    const id = Number.parseInt(event.target.value, 10);
    const { users } = this.state;
    const currentUser = users.find(user => user.id === id);

    if (currentUser) {
      users.splice(users.indexOf(currentUser), 1);
    } else {
      users.push(this.props.users.find(user => user.id === id));
    }

    this.setState({
      users,
    });
  }

  onChangeIsTemplate() {
    this.setState({
      isTemplate: !this.state.isTemplate,
    });
  }

  onTemplateChange(event) {
    this.setState({
      template: this.props.templates
        .find(template => template === event.target.id),
    });
  }

  onChangeMail(event) {
    this.setState({
      mail: event.target.value,
    });
  }

  onChangeEmailTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  render() {
    const role = account.getAccountRole();

    return (
      <React.Fragment>
        <Navbar light expand="md">
          <NavbarBrand tag={Link} to="/">{this.props.title}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              {this.props.links
                .filter(item => item.allowedRoles.includes(role))
                .map(item => (
                  <NavItem key={item.name}>
                    <NavLink tag={Link} to={item.route}>{item.name}</NavLink>
                  </NavItem>
                ))}
            </Nav>

            {account.getAccountRole() === ROLE_ADMIN && (
              <Nav className="ml-auto" navbar>
                <Button color="primary" href="#" onClick={this.onSendMailClick}>Send Mail</Button>
              </Nav>
            )}
            <Nav className="ml-auto" navbar>
              <span>
                {this.props.username} ( <a href="/" onClick={this.onLogoutClick}>Logout</a> )
              </span>
            </Nav>
          </Collapse>
        </Navbar>

        <div>
          <DataModal
            actionType="Send Email"
            confirmName="Send"
            cancelName="Cancel"
            isActive={this.state.isActiveModal}
            onTogleModal={this.onTogleModal}
            onConfirm={this.onSendMail}
            onCancel={this.onCancelSendMail}
          >
            <FormGroup>
              <Label for="email-title">Title *</Label>

              <Input
                type="text"
                name="email-title'"
                id="email-title"
                placeholder="Enter title"
                value={this.state.title}
                onChange={this.onChangeEmailTitle}
              />

            </FormGroup>

            <LabelMultiSelect
              labelName="Users"
              inputName="users"
              inputId="email-users"
              options={this.props.users
                .filter(user => user.id !== Number.parseInt(account.getAccountId(), 10))
                .map(user => ({
                  key: user.id,
                  value: `${user.firstName} ${user.lastName}`,
                }))}
              value={this.state.users.map(user => user.id)}
              onOptionClick={this.onUsersChange}
            />

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={this.state.isTemplate}
                  onChange={this.onChangeIsTemplate}
                />Use Template
              </Label>
            </FormGroup>

            {this.state.isTemplate && (
              <LabelDropdown
                labelName="Templates"
                dropdownId="emails-template"
                dropdownData={this.props.templates.map(template => ({
                  key: template,
                  value: template,
                }))}
                isRequired={true}
                selectedKey={this.state.template ? this.state.template : null}
                onChange={this.onTemplateChange}
              />
            )}

            {!this.state.isTemplate && (
              <React.Fragment>
                <FormGroup>
                  <Label for="textarea">Mail *</Label>
                  <Input
                    type="textarea"
                    value={this.state.mail}
                    onChange={this.onChangeMail}
                  />
                </FormGroup>
              </React.Fragment>
            )}
          </DataModal>
        </div>
      </React.Fragment>
    );
  }
}

NavigationBar.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    route: PropTypes.string,
  })),
  username: PropTypes.string,
  onLogout: PropTypes.func,
};

NavigationBar.defaultProps = {
  title: null,
  links: null,
  username: null,
  onLogout: null,
};

export default NavigationBar;
