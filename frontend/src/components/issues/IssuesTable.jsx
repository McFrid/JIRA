import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';

import DataTable from '../../components/common/DataTable';
import TablePagination from '../../components/common/TablePagination';

import account from '../../utils/account';

const ROLE_DEVELOPER = 'ROLE_DEVELOPER';
const ROLE_MANAGER = 'ROLE_MANAGER';
const DELIMETER = ', ';

class IssuesTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      'description',
      'story',
      'createdDate',
      'developers',
      'solution',
      'estimation',
    ];

    this.columnNames = {
      description: 'Description',
      story: 'Story',
      createdDate: 'Created Date',
      developers: 'Developers',
      solution: 'Solution',
      estimation: 'Estimation',
    };

    this.buttons = issueInfo => (
      <div>
        <Button color="primary" onClick={this.onEditClick.bind(this, issueInfo.id)}>Edit</Button>

        {account.getAccountRole() === ROLE_MANAGER && (
          <Button color="danger" onClick={this.onDeleteClick.bind(this, issueInfo.id)}>Delete</Button>
        )}
      </div>
    );

    this.multiCheckAction = issueIds => (
      <Button color="danger" size="sm" onClick={e => this.onDeleteSelectedClick(e, issueIds)}>
        Delete selected
      </Button>
    );
  }

  onDeleteSelectedClick(event, issueIds) {
    this.props.removeMultipleIssues(issueIds);
  }

  onEditClick(id) {
    this.props.updateIssue(id);
  }

  onDeleteClick(id) {
    this.props.removeIssue(id);
  }

  render() {
    const issuesInfo = this.props.issues
      .map(issue => ({
        ...issue,
        story: issue.storyId ? this.props.stories
          .find(story => story.id === issue.storyId).description : '',
        solution: issue.solutionId ? this.props.solutions
          .find(solution => solution.id === issue.solutionId).description : '',
        createdDate: moment(issue.date).format('MM/DD/YY'),
        developers: issue.users
          .filter(user => user.authority === ROLE_DEVELOPER)
          .map(user => `${user.firstName} ${user.lastName}`)
          .join(DELIMETER),
        estimation: issue.solutionId ? this.props.solutions
          .find(solution => solution.id === issue.solutionId).estimation : '',
      }));

    return (
      <React.Fragment>
        <DataTable
          multiCheckBoxes
          multiCheckAction={this.multiCheckAction}
          columns={this.columns}
          columnNames={this.columnNames}
          data={issuesInfo}
          actions={this.buttons}
        />

        {issuesInfo.length !== 0 && (
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

IssuesTable.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    productId: PropTypes.number,
    createdDate: PropTypes.string,
  })),
  issues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    createdDate: PropTypes.string,
    description: PropTypes.string,
    solutionId: PropTypes.number,
    storyId: PropTypes.number,
  })),
  solutions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  })),
  updateIssue: PropTypes.func,
  removeIssue: PropTypes.func,
  removeMultipleIssues: PropTypes.func,
};

IssuesTable.defaultProps = {
  stories: [],
  issues: [],
  solutions: [],
  updateIssue: null,
  removeIssue: null,
  removeMultipleUsers: null,
};

export default IssuesTable;
