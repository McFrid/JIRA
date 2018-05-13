import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';

import DataTable from '../../components/common/DataTable';

import account from '../../utils/account';

const ROLE_DEVELOPER = 'ROLE_DEVELOPER';
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
        <Button color="danger" onClick={this.onDeleteClick.bind(this, issueInfo.id)}>Delete</Button>
      </div>
    );
  }

  onEditClick(id) {
    this.props.updateIssue(id);
  }

  onDeleteClick(id) {
    this.props.removeIssue(id);
  }

  render() {
    const issuesInfo = this.props.issues
      .filter(issue => !!issue.users
        .find(user => user.id === Number.parseInt(account.getAccountId(), 10)))
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
      <DataTable
        columns={this.columns}
        columnNames={this.columnNames}
        data={issuesInfo}
        actions={this.buttons}
      />
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
};

IssuesTable.defaultProps = {
  stories: [],
  issues: [],
  solutions: [],
  updateIssue: null,
  removeIssue: null,
};

export default IssuesTable;
