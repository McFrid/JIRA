import React from 'react'
import { Button } from 'reactstrap';

import UsersTable from './UsersTable';
import DataModal from '../common/DataModal';

class UsersMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveAddModal: false,
      isActiveUpdateModal: false,
    };
    this.usersForm = this.createUsersForms();

    this.onTogleModal = this.onTogleModal.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.onCanceAddUser = this.onCanceAddUser.bind(this);
  }

  createUsersForms() {
    
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
        />
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