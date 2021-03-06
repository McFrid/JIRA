import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import toastr from 'toastr';

import ProductsTable from './ProductsTable';
import ProductsForm from './ProductsForm';
import DataModal from '../common/DataModal';
import Spinner from '../common/Spinner';
import account from '../../utils/account';

const ROLE_CUSTOMER = 'ROLE_CUSTOMER';
const ROLE_DEVELOPER = 'ROLE_DEVELOPER';

const ButtonWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;

class ProductsMainPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};

    if (!nextProps.isActiveRequest && prevState.isActiveRequest) {
      if (!nextProps.isProductsError) {
        newState = {
          ...newState,
          name: '',
          developers: [],
          isActiveAddModal: false,
          isActiveUpdateModal: false,
          currentPage: 1,
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
      isActiveRequest: false,
      name: '',
      developers: [],
      currentPage: 1,
      rowPerPage: 3,
      accountUsername: account.getAccountUsername(),
    };

    this.onToggleModal = this.onToggleModal.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.onCancelAddProduct = this.onCancelAddProduct.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onToggleUpdateProductModal = this.onToggleUpdateProductModal.bind(this);
    this.onCancelUpdateProduct = this.onCancelUpdateProduct.bind(this);
    this.onUpdateProduct = this.onUpdateProduct.bind(this);
    this.onDevelopersChange = this.onDevelopersChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);
    this.onRemoveMultipleProducts = this.onRemoveMultipleProducts.bind(this);
  }

  componentDidMount() {
    this.props.productsActions.fetchProductsPage(this.state.accountUsername, 0, this.state.rowPerPage);
    this.props.usersActions.fetchUsers();
    this.props.storiesActions.fetchStories();
    this.props.productsActions.fetchProductsCount(this.state.accountUsername);
  }

  onInputChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onRemoveMultipleProducts(ids) {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .removeMultipleProducts(ids)
      .then(() => this.props.productsActions.fetchProductsPage(this.state.accountUsername, 0, this.state.rowPerPage));
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
      isActiveUpdateModal: true,
    });
  }

  onCancelUpdateProduct() {
    this.setState({
      isActiveUpdateModal: false,
    });
  }

  onAddProduct() {
    if (!this.state.name) {
      return toastr.warning('You should fill all required fields');
    }

    this.setState({
      isActiveRequest: true,
    });

    const customer = this.props.users
      .find(user => user.id === Number.parseInt(account.getAccountId(), 10));

    this.props
      .storeProduct({
        name: this.state.name,
        users: [
          ...this.state.developers,
          customer,
        ],
      })
      .then(() => this.props.productsActions.fetchProductsPage(this.state.accountUsername, 0, this.state.rowPerPage));
  }

  onUpdateProduct() {
    if (!this.state.name) {
      return toastr.warning('You should fill all required fields');
    }

    this.setState({
      isActiveRequest: true,
    });

    const customer = this.props.users
      .find(user => user.id === Number.parseInt(account.getAccountId(), 10));

    this.props
      .updateProduct(this.state.id, {
        name: this.state.name,
        users: [
          ...this.state.developers,
          customer,
        ],
      })
      .then(() => this.props.productsActions.fetchProductsPage(this.state.accountUsername, 0, this.state.rowPerPage));
  }

  onRemoveProduct(id) {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .removeProduct(id)
      .then(() => this.props.productsActions.fetchProductsPage(this.state.accountUsername, 0, this.state.rowPerPage));
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
    };

    this.setState(newState);
  }

  onChangePage(index) {
    this.setState({
      currentPage: index,
    });

    this.props.productsActions.fetchProductsPage(this.state.accountUsername, index - 1, this.state.rowPerPage);
  }

  render() {
    if (this.props.areUsersFetching ||
        this.props.areProductsFetching ||
        this.props.areStoriesFetching ||
        this.props.isCountFetching ||
      !this.props.areUsersLoaded ||
      !this.props.areProductsLoaded ||
      !this.props.areStoriesLoaded ||
      !this.props.isCountLoaded) {
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
            developers={this.props.users.filter(user => user.authority === ROLE_DEVELOPER)}
            onInputChange={this.onInputChange}
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
            developers={this.props.users.filter(user => user.authority === ROLE_DEVELOPER)}
            onInputChange={this.onInputChange}
            onDevelopersChange={this.onDevelopersChange}
          />
        </DataModal>

        <ProductsTable
          products={this.props.products}
          stories={this.props.stories}
          currentPage={this.state.currentPage}
          rowPerPage={this.state.rowPerPage}
          total={this.props.total}
          onChangePage={this.onChangePage}
          updateProduct={this.onToggleUpdateProductModal}
          removeProduct={this.onRemoveProduct}
          removeMultipleProducts={this.onRemoveMultipleProducts}
        />

        {account.getAccountRole() === ROLE_CUSTOMER && (
          <ButtonWrapper>
            <Button color="success" onClick={this.onToggleModal} >Add New Product</Button>
          </ButtonWrapper>
        )}
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
  storiesActions: PropTypes.objectOf(PropTypes.func),
  storeProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  removeMultipleProducts: PropTypes.func,
  areUsersFetching: PropTypes.bool,
  areUsersLoaded: PropTypes.bool,
  areProductsFetching: PropTypes.bool,
  areProductsLoaded: PropTypes.bool,
  areStoriesFetching: PropTypes.bool,
  areStoriesLoaded: PropTypes.bool,
};

ProductsMainPage.defaultProps = {
  products: [],
  users: [],
  usersActions: {},
  productsActions: {},
  storiesActions: {},
  storeProduct: null,
  updateProduct: null,
  removeProduct: null,
  removeMultipleProducts: null,
  areUsersFetching: false,
  areUsersLoaded: false,
  areProductsFetching: false,
  areProductsLoaded: false,
  areStoriesFetching: false,
  areStoriesLoaded: false,
};

export default ProductsMainPage;

