import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import UsersTable from './UsersTable';
import UsersForm from './UsersForm';
import DataModal from '../common/DataModal';
import Spinner from '../common/Spinner';

class UsersMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveAddModal: false,
      isActiveUpdateModal: false,
    };

    this.userProperties = ['email', 'firstName', 'lastName', 'experience', 'roleId'];

    this.userProperties.forEach((property) => {
      this.state[property] = '';
    });

    this.onToggleModal = this.onToggleModal.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.onCancelAddUser = this.onCancelAddUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onToggleUpdateUserModal = this.onToggleUpdateUserModal.bind(this);
    this.onCancelUpdateUser = this.onCancelUpdateUser.bind(this);
    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.onDropdownSelectionChange = this.onDropdownSelectionChange.bind(this);
  }

  componentWillMount() {
    this.props.usersActions.fetchUsers();
    this.props.rolesActions.fetchRoles();

    this.setState({
      roleId: this.props.roles[0].id
    });
  }

  onInputChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onDropdownSelectionChange(name, event) {
    this.setState({
      [name]: parseInt(event.target.id),
    })
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
      experience: currentUser.experience,
      roleId: currentUser.roleId,
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
      isActiveAddModal: false,
    });

    this.props.userActions.storeUser({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      experience: this.state.experience,
      roleId: this.state.roleId,
    });

    this.setDefaultProperties();
  }

  onUpdateUser() {
    this.setState({
      isActiveUpdateModal: false,
    });

    this.props.userActions.updateUser(this.state.id, {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      experience: this.state.experience,
      roleId: this.state.roleId
    });

    this.setDefaultProperties();
  }

  setDefaultProperties() {
    const newState = {};

    this.userProperties.forEach((property) => {
      newState[property] = '';
    });
    newState['roleId'] = this.props.roles[0].id;

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
            experience={this.state.experience}
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
            experience={this.state.experience}
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
          removeUser={this.props.userActions.removeUser}
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
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })),
  userActions: PropTypes.objectOf(PropTypes.func),
  usersActions: PropTypes.objectOf(PropTypes.func),
  rolesActions: PropTypes.objectOf(PropTypes.func),
  areUsersFetching: PropTypes.bool,
  areUsersLoaded: PropTypes.bool,
  areRolesLoaded: PropTypes.bool
};

UsersMainPage.defaultProps = {
  users: [],
  roles: [],
  userActions: {},
  usersActions: {},
  rolesActions: {},
  areUsersFetching: false,
  areUsersLoaded: false,
  areRolesLoaded: false,
};

export default UsersMainPage;

