import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';

import DataTable from '../../components/common/DataTable';

class IssuesTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      'description',
      'story',
      'createdDate',
      'developers',
      'manager'
    ];

    this.columnNames = {
      description: 'Description',
      story: 'Story',
      createdDate: 'Created Date',
      developers: 'Developers',
      manager: 'Manager',
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
    const issuesInfo = this.props.issues.map(issue => ({
      ...issue,
      story: issue.storyId ? this.props.stories.find(story => story.id === issue.storyId).name : '',
      //solution: issue.solutionId ? this.props.
      createdDate: moment(issue.date).format('MM/DD/YY'),
      manager: issue.users.find(user => user.authority)
    }));

    return (
      <DataTable
        columns={this.columns}
        columnNames={this.columnNames}
        data={productsInfo}
        actions={this.buttons}
      />
    );
  }
}

StoriesTable.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    productId: PropTypes.number,
    createdDate: PropTypes.string,
  })),
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      authority: PropTypes.string,
      login: PropTypes.string,
    })),
  })),
  updateStory: PropTypes.func,
  removeStory: PropTypes.func,
};

StoriesTable.defaultProps = {
  stories: [],
  products: [],
  updateStory: null,
  removeStory: null,
};

export default StoriesTable;
