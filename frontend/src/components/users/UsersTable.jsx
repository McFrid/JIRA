import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';

import DataTable from '../../components/common/DataTable';
import TablePagination from '../../components/common/TablePagination';

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
      'birthday',
    ];

    this.columnNames = {
      email: 'Email',
      firstName: 'First Name',
      lastName: 'Last Name',
      role: 'Role',
      login: 'Login',
      activated: 'Activated',
      birthday: 'Birth Day',
    };

    this.buttons = userInfo => (
      <div>
        <Button color="primary" onClick={this.onEditClick.bind(this, userInfo.id)}>Edit</Button>
        {userInfo.canBeRemoved && (
          <Button color="danger" onClick={this.onDeleteClick.bind(this, userInfo.login)}>Delete</Button>
        )}
      </div>
    );

    this.multiCheckAction = userIds => (
      <Button color="danger" size="sm" onClick={e => this.onDeleteSelectedClick(e, userIds)}>
        Delete selected
      </Button>
    );
  }

  onDeleteSelectedClick(event, userIds) {
    this.props.removeMultipleUsers(userIds);
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
      birthday: user.birthdate ? moment(user.birthdate).format('MM/DD/YYYY') : '',
      canBeRemoved: !this.props.products
        .find(product => !!product.users
          .find(productUser => productUser.id === user.id)) &&
        !this.props.issues
          .find(issue => !!issue.users
            .find(issueUser => issueUser.id === user.id)),
    }));

    return (
      <React.Fragment>
        <DataTable
          multiCheckBoxes
          multiCheckAction={this.multiCheckAction}
          columns={this.columns}
          columnNames={this.columnNames}
          data={usersInfo}
          actions={this.buttons}
        />

        {usersInfo.length !== 0 && (
          <TablePagination
            total={this.props.total}
            rowPerPage={this.props.rowPerPage}
            currentPage={this.props.currentPage}
            changePage={this.props.onChangePage}
          />
        )}
      </React.Fragment>
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
  removeMultipleUsers: PropTypes.func,
};

UsersTable.defaultProps = {
  users: [],
  roles: [],
  updateUser: null,
  removeUser: null,
  removeMultipleUsers: null,
};

export default UsersTable;
