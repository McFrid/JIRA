import React from 'react'
import { Button } from 'reactstrap';

import UsersTable from './UsersTable';
import UsersForm from './UsersForm';
import DataModal from '../common/DataModal';

class UsersMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveAddModal: false,
      isActiveUpdateModal: false,
    };

    this.userProperties = ['email', 'firstName', 'lastName', 'experience'];
    this.setDefaultProperties(this.state);

    this.onTogleModal = this.onTogleModal.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.onCanceAddUser = this.onCanceAddUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onTogleUpdateUserModal = this.onTogleUpdateUserModal.bind(this);
    this.onCanceUpdateUser = this.onCanceUpdateUser.bind(this);
    this.onUpdateUser = this.onUpdateUser.bind(this);
  }

  setDefaultProperties(state) {
    if (state) {
      this.userProperties.forEach(property => {
        state[property] = '';
      });
    } else {
      const newState = {}

      this.userProperties.forEach(property => {
        newState[property] = '';
      });

      this.setState(newState);
    }
  }

  onInputChange(name, event) {
    this.setState({
      [name]: event.target.value
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
    const user = this.props.users.find(user => user.id === id);

    this.setState({
      id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      experience: user.experience,
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
      experience: this.state.experience
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

  render() {
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
        <Button
          color="success"
          onClick={this.onTogleModal}
        >Add New User</Button>
      </div>
    )
  }
}

export default UsersMainPage;