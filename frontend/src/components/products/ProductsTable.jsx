import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import DataTable from '../../components/common/DataTable';

const ROLE_CUSTOMER = 'ROLE_CUSTOMER';
const ROLE_DEVELOPER = 'ROLE_DEVELOPER';
const DELIMETER = ', ';

class ProductsTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      'name',
      'developers',
      'customer',
    ];

    this.columnNames = {
      name: 'Name',
      developers: 'Developers',
      customer: 'Customer',
    };

    this.buttons = productInfo => (
      <div>
        <Button color="primary" onClick={this.onEditClick.bind(this, productInfo.id)}>Edit</Button>
        <Button color="danger" onClick={this.onDeleteClick.bind(this, productInfo.id)}>Delete</Button>
      </div>
    );
  }

  onEditClick(id) {
    this.props.updateProduct(id);
  }

  onDeleteClick(id) {
    this.props.removeProduct(id);
  }

  render() {
    const productsInfo = this.props.products.map((product) => {
      const customer = product.users.find(user => user.authority === ROLE_CUSTOMER);

      return ({
        ...product,
        developers: product.users
          .filter(user => user.authority === ROLE_DEVELOPER)
          .map(user => `${user.firstName} ${user.lastName}`)
          .join(DELIMETER),
        customer: customer ? `${customer.firstName} ${customer.lastName}` : '',
      });
    });

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

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    developers: PropTypes.arrayOf(PropTypes.string),
    customer: PropTypes.string,
  })),
  updateProduct: PropTypes.func,
  removeProduct: PropTypes.func,
};

ProductsTable.defaultProps = {
  products: [],
  updateProduct: null,
  removeProduct: null,
};

export default ProductsTable;
