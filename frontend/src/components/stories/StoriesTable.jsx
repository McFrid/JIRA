import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';

import DataTable from '../../components/common/DataTable';
import TablePagination from '../../components/common/TablePagination';

import account from '../../utils/account';

const ROLE_CUSTOMER = 'ROLE_CUSTOMER';

class StoriesTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      'description',
      'product',
      'createdDate',
    ];

    this.columnNames = {
      description: 'Description',
      product: 'Product',
      createdDate: 'Created Date',
    };

    this.buttons = storyInfo => (
      <div>
        <Button color="primary" onClick={this.onEditClick.bind(this, storyInfo.id)}>Edit</Button>

        {storyInfo.canBeRemoved && (
          <Button color="danger" onClick={this.onDeleteClick.bind(this, storyInfo.id)}>Delete</Button>
        )}
      </div>
    );

    this.multiCheckAction = storyIds => (
      <Button color="danger" size="sm" onClick={e => this.onDeleteSelectedClick(e, storyIds)}>
        Delete selected
      </Button>
    );
  }

  onDeleteSelectedClick(event, storyIds) {
    this.props.removeMultipleStories(storyIds);
  }

  onEditClick(id) {
    this.props.updateStory(id);
  }

  onDeleteClick(id) {
    this.props.removeStory(id);
  }

  render() {
    const storiesInfo = this.props.stories.map(story => ({
      ...story,
      product: story.productId ? this.props.products.find(product => product.id === story.productId).name : '',
      createdDate: moment(story.date).format('MM/DD/YY'),
      canBeRemoved: !this.props.issues
        .find(issue => issue.storyId === story.id),
    }));

    return (
      <React.Fragment>
        <DataTable
          multiCheckBoxes
          multiCheckAction={this.multiCheckAction}
          columns={this.columns}
          columnNames={this.columnNames}
          data={storiesInfo}
          actions={account.getAccountRole() === ROLE_CUSTOMER ? this.buttons : null}
        />

        {storiesInfo.length !== 0 && (
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
  removeMultipleStories: PropTypes.func,
};

StoriesTable.defaultProps = {
  stories: [],
  products: [],
  updateStory: null,
  removeStory: null,
  removeMultipleStories: null,
};

export default StoriesTable;
