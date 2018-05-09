import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import UsersTable from './UsersTable';
import UsersForm from './UsersForm';
import DataModal from '../common/DataModal';
import Spinner from '../common/Spinner';

class UsersMainPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};
    if (nextProps.areRolesLoaded &&
      !prevState.isCurrentRoleSet) {
      newState = {
        ...newState,
        isCurrentRoleSet: true,
        roleId: nextProps.roles[0],
      };
    }

    if (!nextProps.isActiveRequest && prevState.isActiveRequest) {
      if (!nextProps.isUsersError) {
        newState = {
          ...newState,
          email: '',
          firstName: '',
          lastName: '',
          login: '',
          authority: '',
          isActiveAddModal: false,
          isActiveUpdateModal: false,
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
    this.state = {
      isActiveAddModal: false,
      isActiveUpdateModal: false,
      isCurrentRoleSet: false,
      isActiveRequest: false,
      email: '',
      firstName: '',
      lastName: '',
      login: '',
      roleId: '',
    };

    this.userProperties = ['email', 'firstName', 'lastName', 'login', 'roleId'];

    this.onToggleModal = this.onToggleModal.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.onCancelAddUser = this.onCancelAddUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onToggleUpdateUserModal = this.onToggleUpdateUserModal.bind(this);
    this.onCancelUpdateUser = this.onCancelUpdateUser.bind(this);
    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.onDropdownSelectionChange = this.onDropdownSelectionChange.bind(this);
  }

  componentDidMount() {
    this.props.usersActions.fetchUsers();
    this.props.rolesActions.fetchRoles();
  }

  onInputChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onDropdownSelectionChange(name, event) {
    this.setState({
      [name]: event.target.id,
    });
  }

  onToggleModal() {
    this.setDefaultProperties();

    this.setState({
      isActiveAddModal: true,
    });
  }

  onCancelAddUser() {
    this.setState({
      isActiveAddModal: false,
    });
  }

  onToggleUpdateUserModal(id) {
    const currentUser = this.props.users.find(user => user.id === id);

    this.setState({
      id,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      login: currentUser.login,
      roleId: currentUser.authority,
      isActiveUpdateModal: true,
    });
  }

  onCancelUpdateUser() {
    this.setState({
      isActiveUpdateModal: false,
    });
  }

  onAddUser() {
    this.setState({
      isActiveRequest: true,
    });

    this.props.storeUser({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      login: this.state.login,
      authority: this.state.roleId,
    });
  }

  onUpdateUser() {
    this.setState({
      isActiveRequest: true,
    });

    this.props.updateUser(this.state.id, {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      login: this.state.login,
      authority: this.state.roleId,
    });
  }

  setDefaultProperties() {
    const newState = {};

    this.userProperties.forEach((property) => {
      newState[property] = '';
    });
    [newState.roleId] = this.props.roles;

    this.setState(newState);
  }

  render() {
    if (this.props.areUsersFetching ||
      !this.props.areUsersLoaded ||
      !this.props.areRolesLoaded) {
      return (
        <Spinner />
      );
    }

    return (
      <div>
        <DataModal
          actionType="Add New User"
          confirmName="Add"
          cancelName="Cancel"
          isActive={this.state.isActiveAddModal}
          onTogleModal={this.onToggleModal}
          onConfirm={this.onAddUser}
          onCancel={this.onCancelAddUser}
        >
          <UsersForm
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            login={this.state.login}
            roles={this.props.roles}
            currentRoleId={this.state.roleId}
            onInputChange={this.onInputChange}
            onDropdownSelectionChange={this.onDropdownSelectionChange}
          />
        </DataModal>

        <DataModal
          actionType="Update User"
          confirmName="Update"
          cancelName="Cancel"
          isActive={this.state.isActiveUpdateModal}
          onTogleModal={this.onToggleUpdateUserModal}
          onConfirm={this.onUpdateUser}
          onCancel={this.onCancelUpdateUser}
        >
          <UsersForm
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            login={this.state.login}
            roles={this.props.roles}
            currentRoleId={this.state.roleId}
            onInputChange={this.onInputChange}
            onDropdownSelectionChange={this.onDropdownSelectionChange}
          />
        </DataModal>

        <UsersTable
          users={this.props.users}
          roles={this.props.roles}
          updateUser={this.onToggleUpdateUserModal}
          removeUser={this.props.removeUser}
        />
        <Button color="success" onClick={this.onToggleModal} >Add New User</Button>
      </div>
    );
  }
}

UsersMainPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    roleId: PropTypes.number,
    experience: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  roles: PropTypes.arrayOf(PropTypes.string),
  usersActions: PropTypes.objectOf(PropTypes.func),
  rolesActions: PropTypes.objectOf(PropTypes.func),
  storeUser: PropTypes.func,
  updateUser: PropTypes.func,
  removeUser: PropTypes.func,
  areUsersFetching: PropTypes.bool,
  areUsersLoaded: PropTypes.bool,
  areRolesLoaded: PropTypes.bool,
};

UsersMainPage.defaultProps = {
  users: [],
  roles: [],
  usersActions: {},
  rolesActions: {},
  storeUser: null,
  updateUser: null,
  removeUser: null,
  areUsersFetching: false,
  areUsersLoaded: false,
  areRolesLoaded: false,
};

export default UsersMainPage;

