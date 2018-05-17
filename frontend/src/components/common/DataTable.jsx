import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';

import './DataTable.css';

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectAllChecked: false,
      selectedIds: [],
    }

    this.onCheckAll = this.onCheckAll.bind(this);
    this.onCheckSingle = this.onCheckSingle.bind(this);
  }

  onCheckAll(event) {
    const newIds = this.state.isSelectAllChecked
      ? []
      : this.props.data.map(item => item.id);

    this.setState({
      isSelectAllChecked: !this.state.isSelectAllChecked,
      selectedIds: newIds,
    });
  }

  onCheckSingle(event, selectedId) {
    const newIds = this.state.selectedIds.includes(selectedId)
      ? this.state.selectedIds.filter(item => item !== selectedId)
      : this.state.selectedIds.concat(selectedId);

    this.setState({
      selectedIds: newIds,
      isSelectAllChecked: newIds.length === this.props.data.length,
    });
  }

  render() {
    return (
      <Table dark className="data-table">
        <thead>
          <tr>
            {this.props.multiCheckBoxes && (
              <th>
                <input
                  type="checkbox"
                  onClick={this.onCheckAll}
                  checked={this.state.isSelectAllChecked}
                />
              </th>
            )}

            {this.props.columns.map(column => (
              <th key={column}>{this.props.columnNames[column]}</th>
            ))}

            {this.props.actions && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(row => (
            <tr key={row.id}>
              {this.props.multiCheckBoxes &&
                <td>
                  <input
                    type="checkbox"
                    onClick={e => this.onCheckSingle(e, row.id)}
                    checked={this.state.selectedIds.includes(row.id)}
                  />
                </td>}
              {this.props.columns.map(column => (
                <td key={column}>{row[column]}</td>
              ))}

              {this.props.actions && (
                <td>{this.props.actions(row)}</td>
              )}
            </tr>
          ))}
          {this.props.multiCheckBoxes &&
            <tr>
              <td>
                {this.props.multiCheckAction(this.state.selectedIds)}
              </td>
            </tr>
          }
        </tbody>
      </Table>
    );
  }
}

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
  multiCheckBoxes: PropTypes.bool,
  multiCheckAction: PropTypes.func,
};

DataTable.defaultProps = {
  columns: [],
  columnNames: {},
  data: [],
  actions: null,
  multiCheckBoxes: false,
  multiCheckAction: PropTypes.func,
};

export default DataTable;
