import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import DataTable from '../../components/common/DataTable';

import getAuthority from '../../utils/mapUserAuthority';

class UsersTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      'email',
      'firstName',
      'lastName',
      'role',
      'login',
      'activated',
    ];

    this.columnNames = {
      email: 'Email',
      firstName: 'First Name',
      lastName: 'Last Name',
      role: 'Role',
      login: 'Login',
      activated: 'Activated',
    };

    this.buttons = userInfo => (
      <div>
        <Button color="primary" onClick={this.onEditClick.bind(this, userInfo.id)}>Edit</Button>
        <Button color="danger" onClick={this.onDeleteClick.bind(this, userInfo.login)}>Delete</Button>
      </div>
    );
  }

  onEditClick(id) {
    this.props.updateUser(id);
  }

  onDeleteClick(id) {
    this.props.removeUser(id);
  }

  render() {
    const usersInfo = this.props.users.map(user => ({
      ...user,
      role: getAuthority(this.props.roles.find(role => role === user.authority)),
      activated: user.activated ? 'Yes' : 'No',
    }));

    return (
      <DataTable
        columns={this.columns}
        columnNames={this.columnNames}
        data={usersInfo}
        actions={this.buttons}
      />
    );
  }
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    authority: PropTypes.string,
    login: PropTypes.string,
    activated: PropTypes.bool,
  })),
  roles: PropTypes.arrayOf(PropTypes.string),
  updateUser: PropTypes.func,
  removeUser: PropTypes.func,
};

UsersTable.defaultProps = {
  users: [],
  roles: [],
  updateUser: null,
  removeUser: null,
};

export default UsersTable;
