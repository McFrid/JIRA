import React from 'react';
import PropTypes from 'prop-types';

import DataTable from '../../components/common/DataTable';

const columns = [
  'id',
  'email',
  'firstName',
  'lastName',
  'experience',
];

const columnNames = {
  id: 'ID',
  email: 'Email',
  firstName: 'First Name',
  lastName: 'Last Name',
  experience: 'Experience',
};

const UsersTable = props => (
  <DataTable
    columns={columns}
    columnNames={columnNames}
    data={props.users}
  />
);

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
