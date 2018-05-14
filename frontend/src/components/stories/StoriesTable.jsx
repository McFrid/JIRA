import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';

import DataTable from '../../components/common/DataTable';

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
  }

  onEditClick(id) {
    this.props.updateStory(id);
  }

  onDeleteClick(id) {
    this.props.removeStory(id);
  }

  render() {
    const productsInfo = this.props.stories.map(story => ({
      ...story,
      product: story.productId ? this.props.products.find(product => product.id === story.productId).name : '',
      createdDate: moment(story.date).format('MM/DD/YY'),
      canBeRemoved: !this.props.issues
        .find(issue => issue.storyId === story.id),
    }));

    return (
      <DataTable
        columns={this.columns}
        columnNames={this.columnNames}
        data={productsInfo}
        actions={account.getAccountRole() === ROLE_CUSTOMER ? this.buttons : null}
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
