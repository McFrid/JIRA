import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap'

import DataTable from '../../components/common/DataTable';

class UsersTable extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      'email',
      'firstName',
      'lastName',
      'experience'
    ];

    this.columnNames = {
      email: 'Email',
      firstName: 'First Name',
      lastName: 'Last Name',
      experience: 'Experience'
    };

    this.buttons = id => (
      <div>
        <Button color='primary' onClick={this.onEditClick.bind(this, id)}>Edit</Button>
        <Button color='danger' onClick={this.onDeleteClick.bind(this, id)}>Delete</Button>
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
    return (
      <DataTable
        columns={this.columns}
        columnNames={this.columnNames}
        data={this.props.users}
        actions={this.buttons}
      />
    )
  }
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    experience: PropTypes.number,
  })),
};

UsersTable.defaultProps = {
  users: [],
};

export default UsersTable;
