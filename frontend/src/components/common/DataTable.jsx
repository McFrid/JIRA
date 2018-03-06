import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

const DataTable = props => (
  <Table dark>
    <thead>
      <tr>
        {props.columns.map(column => (
          <th key={column}>{props.columnNames[column]}</th>
        ))}

        {props.actions && (
          <th>Actions</th>
        )}
      </tr>
    </thead>
    <tbody>
      {props.data.map(row => (
        <tr key={row.id}>
          {props.columns.map(column => (
            <td key={column}>{row[column]}</td>
          ))}

          {props.actions && (
            <td>{props.actions(row.id)}</td>
          )}
        </tr>
      ))}
    </tbody>
  </Table>
);

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  columnNames: PropTypes.oneOfType([
    PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      experience: PropTypes.string,
    }),
  ]),
  data: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.func,
};

DataTable.defaultProps = {
  columns: [],
  columnNames: {},
  data: [],
  actions: null,
};

export default DataTable;
