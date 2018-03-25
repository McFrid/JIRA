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

    this.userProperties = ['email', 'firstName', 'lastName', 'experience'];

    this.userProperties.forEach((property) => {
      this.state[property] = '';
    });

    this.onTogleModal = this.onTogleModal.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.onCanceAddUser = this.onCanceAddUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onTogleUpdateUserModal = this.onTogleUpdateUserModal.bind(this);
    this.onCanceUpdateUser = this.onCanceUpdateUser.bind(this);
    this.onUpdateUser = this.onUpdateUser.bind(this);
  }

  componentWillMount() {
    this.props.usersActions.fetchUsers();
    this.props.rolesActions.fetchRoles();
  }

  onInputChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onTogleModal() {
    this.setDefaultProperties();

    this.setState({
      isActiveAddModal: true,
    });
  }

  onCanceAddUser() {
    this.setState({
      isActiveAddModal: false,
    });
  }

  onTogleUpdateUserModal(id) {
    const currentUser = this.props.users.find(user => user.id === id);

    this.setState({
      id,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      experience: currentUser.experience,
      isActiveUpdateModal: true,
    });
  }

  onCanceUpdateUser() {
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
    });

    this.setDefaultProperties();
  }

  setDefaultProperties() {
    const newState = {};

    this.userProperties.forEach((property) => {
      newState[property] = '';
    });

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
          onTogleModal={this.onTogleModal}
          onConfirm={this.onAddUser}
          onCancel={this.onCanceAddUser}
        >
          <UsersForm
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            experience={this.state.experience}
            onInputChange={this.onInputChange}
          />
        </DataModal>

        <DataModal
          actionType="Update User"
          confirmName="Update"
          cancelName="Cancel"
          isActive={this.state.isActiveUpdateModal}
          onTogleModal={this.onTogleUpdateUserModal}
          onConfirm={this.onUpdateUser}
          onCancel={this.onCanceUpdateUser}
        >
          <UsersForm
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            experience={this.state.experience}
            onInputChange={this.onInputChange}
          />
        </DataModal>

        <UsersTable
          users={this.props.users}
          updateUser={this.onTogleUpdateUserModal}
          removeUser={this.props.userActions.removeUser}
        />
        <Button color="success" onClick={this.onTogleModal} >Add New User</Button>
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
    experience: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  userActions: PropTypes.objectOf(PropTypes.func),
  usersActions: PropTypes.objectOf(PropTypes.func),
  isFetching: PropTypes.bool,
  isLoaded: PropTypes.bool,
};

UsersMainPage.defaultProps = {
  users: [],
  userActions: {},
  usersActions: {},
  isFetching: false,
  isLoaded: false,
};

export default UsersMainPage;

