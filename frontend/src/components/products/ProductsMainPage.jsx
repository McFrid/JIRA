import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import ProductsTable from './ProductsTable';
import ProductsForm from './ProductsForm';
import DataModal from '../common/DataModal';
import Spinner from '../common/Spinner';

const ROLE_CUSTOMER = 'ROLE_CUSTOMER';
const ROLE_DEVELOPER = 'ROLE_DEVELOPER';

class ProductsMainPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};
    if (nextProps.areUsersLoaded &&
      !prevState.isCurrentCustomerSet) {
      newState = {
        ...newState,
        isCurrentCustomerSet: true,
        customer: nextProps.users.find(user => user.authority === ROLE_CUSTOMER),
      };
    }

    if (!nextProps.isActiveRequest && prevState.isActiveRequest) {
      if (!nextProps.isProductsError) {
        newState = {
          ...newState,
          name: '',
          developers: [],
          customer: nextProps.users.find(user => user.authority === ROLE_CUSTOMER),
          isActiveAddModal: false,
          isActiveUpdateModal: false,
        };
      }

      newState = {
        ...newState,
        isActiveRequest: false,
      };
    }

    return newState;
  }

  constructor(props) {
    super(props);
    this.state = {
      isActiveAddModal: false,
      isActiveUpdateModal: false,
      isCurrentCustomerSet: false,
      isActiveRequest: false,
      name: '',
      developers: [],
      customer: null,
    };

    this.onToggleModal = this.onToggleModal.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.onCancelAddProduct = this.onCancelAddProduct.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onToggleUpdateProductModal = this.onToggleUpdateProductModal.bind(this);
    this.onCancelUpdateProduct = this.onCancelUpdateProduct.bind(this);
    this.onUpdateProduct = this.onUpdateProduct.bind(this);
    this.onCustomerChange = this.onCustomerChange.bind(this);
    this.onDevelopersChange = this.onDevelopersChange.bind(this);
  }

  componentDidMount() {
    this.props.productsActions.fetchProducts();
    this.props.usersActions.fetchUsers();
  }

  onInputChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onCustomerChange(event) {
    this.setState({
      customer: this.props.users.find(user => user.id === Number.parseInt(event.target.id, 10)),
    });
  }

  onToggleModal() {
    this.setDefaultProperties();

    this.setState({
      isActiveAddModal: true,
    });
  }

  onCancelAddProduct() {
    this.setState({
      isActiveAddModal: false,
    });
  }

  onToggleUpdateProductModal(id) {
    const currentProduct = this.props.products.find(product => product.id === id);

    this.setState({
      id,
      name: currentProduct.name,
      developers: currentProduct.users.filter(user => user.authority === ROLE_DEVELOPER),
      customer: currentProduct.users.find(user => user.authority === ROLE_CUSTOMER),
      isActiveUpdateModal: true,
    });
  }

  onCancelUpdateProduct() {
    this.setState({
      isActiveUpdateModal: false,
    });
  }

  onAddProduct() {
    this.setState({
      isActiveRequest: true,
    });

    const users = this.state.customer
      ? [this.state.customer]
      : [];

    this.props.storeProduct({
      name: this.state.name,
      users: [
        ...users,
        ...this.state.developers,
      ],
    });
  }

  onUpdateProduct() {
    this.setState({
      isActiveRequest: true,
    });

    const users = this.state.customer
      ? [this.state.customer]
      : [];

    this.props.updateProduct(this.state.id, {
      name: this.state.name,
      users: [
        ...users,
        ...this.state.developers,
      ],
    });
  }

  onDevelopersChange(event) {
    const id = Number.parseInt(event.target.value, 10);
    const { developers } = this.state;
    const currentDeveloper = developers.find(developer => developer.id === id);

    if (currentDeveloper) {
      developers.splice(developers.indexOf(currentDeveloper), 1);
    } else {
      developers.push(this.props.users.find(user => user.id === id));
    }

    this.setState({
      developers,
    });
  }

  setDefaultProperties() {
    const newState = {
      name: '',
      developers: [],
      customer: this.props.users.find(user => user.authority === ROLE_CUSTOMER),
    };

    this.setState(newState);
  }

  render() {
    if (this.props.areUsersFetching ||
        this.props.areProductsFetching ||
      !this.props.areUsersLoaded ||
      !this.props.areProductsLoaded) {
      return (
        <Spinner />
      );
    }

    return (
      <div>
        <DataModal
          actionType="Add New Product"
          confirmName="Add"
          cancelName="Cancel"
          isActive={this.state.isActiveAddModal}
          onTogleModal={this.onToggleModal}
          onConfirm={this.onAddProduct}
          onCancel={this.onCancelAddProduct}
        >
          <ProductsForm
            name={this.state.name}
            currentDevelopers={this.state.developers}
            currentCustomer={this.state.customer}
            developers={this.props.users.filter(user => user.authority === ROLE_DEVELOPER)}
            customers={this.props.users.filter(user => user.authority === ROLE_CUSTOMER)}
            onInputChange={this.onInputChange}
            onCustomerChange={this.onCustomerChange}
            onDevelopersChange={this.onDevelopersChange}
          />
        </DataModal>

        <DataModal
          actionType="Update Product"
          confirmName="Update"
          cancelName="Cancel"
          isActive={this.state.isActiveUpdateModal}
          onTogleModal={this.onToggleUpdateProductModal}
          onConfirm={this.onUpdateProduct}
          onCancel={this.onCancelUpdateProduct}
        >
          <ProductsForm
            name={this.state.name}
            currentDevelopers={this.state.developers}
            currentCustomer={this.state.customer}
            developers={this.props.users.filter(user => user.authority === ROLE_DEVELOPER)}
            customers={this.props.users.filter(user => user.authority === ROLE_CUSTOMER)}
            onInputChange={this.onInputChange}
            onCustomerChange={this.onCustomerChange}
            onDevelopersChange={this.onDevelopersChange}
          />
        </DataModal>

        <ProductsTable
          products={this.props.products}
          updateProduct={this.onToggleUpdateProductModal}
          removeProduct={this.props.removeProduct}
        />
        <Button color="success" onClick={this.onToggleModal} >Add New Product</Button>
      </div>
    );
  }
}

ProductsMainPage.propTypes = {
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
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    authority: PropTypes.string,
    login: PropTypes.string,
  })),
  usersActions: PropTypes.objectOf(PropTypes.func),
  productsActions: PropTypes.objectOf(PropTypes.func),
  storeProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  areUsersFetching: PropTypes.bool,
  areUsersLoaded: PropTypes.bool,
  areProductsFetching: PropTypes.bool,
  areProductsLoaded: PropTypes.bool,
};

ProductsMainPage.defaultProps = {
  products: [],
  users: [],
  usersActions: {},
  productsActions: {},
  storeProduct: null,
  updateProduct: null,
  removeProduct: null,
  areUsersFetching: false,
  areUsersLoaded: false,
  areProductsFetching: false,
  areProductsLoaded: false,
};

export default ProductsMainPage;

