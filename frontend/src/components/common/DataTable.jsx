import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

export default DataTable = props => (
  <Table dark>
    <thead>
      <tr>
        {props.columns.map(column => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {props.data.map(row => (
        <tr key={row.id}>
          {props.columns.map(column => (
            <td key={column}>{row[column]}</td>
          ))}
        </tr>
      )}
    </tbody>
  </Table>
);

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
};

DataTable.defaultProps = {
  columns: [],
  data: [],
};
