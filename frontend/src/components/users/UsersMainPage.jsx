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
    this.setState({
      isActiveAddModal: true,
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

  onCanceAddUser() {
    this.setState({
      isActiveAddModal: false,
    });
  }

  render() {
    return (
      <div>
        <DataModal
          actionType='Add New User'
          confirmName='Add'
          cancelName='Cancel'
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
        <UsersTable users={this.props.users} />
        <Button
          color="success"
          onClick={this.onTogleModal}
        >Add New User</Button>
      </div>
    )
  }
}

export default UsersMainPage;