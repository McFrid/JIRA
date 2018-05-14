import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';
import styled from 'styled-components';

import StoriesTable from './StoriesTable';
import StoriesForm from './StoriesForm';
import DataModal from '../common/DataModal';
import Spinner from '../common/Spinner';

import account from '../../utils/account';

const ButtonWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;

const ROLE_CUSTOMER = 'ROLE_CUSTOMER';
const ROLE_MANAGER = 'ROLE_MANAGER';

class StoriesMainPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};
    if (nextProps.areProductsLoaded &&
      !prevState.isCurrentProductSet) {
      newState = {
        ...newState,
        isCurrentProductSet: true,
        product: nextProps.products.find(product => product),
      };
    }

    if (!nextProps.isActiveRequest && prevState.isActiveRequest) {
      if (!nextProps.isStoriesError) {
        newState = {
          ...newState,
          description: '',
          product: nextProps.products.find(product => product),
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
      isCurrentProductSet: false,
      isActiveRequest: false,
      description: '',
      product: null,
      currentPage: 1,
      rowPerPage: 3,
    };

    this.onToggleModal = this.onToggleModal.bind(this);
    this.onAddStory = this.onAddStory.bind(this);
    this.onCancelAddStory = this.onCancelAddStory.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onToggleUpdateStoryModal = this.onToggleUpdateStoryModal.bind(this);
    this.onCancelUpdateStory = this.onCancelUpdateStory.bind(this);
    this.onUpdateStory = this.onUpdateStory.bind(this);
    this.onProductChange = this.onProductChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onRemoveStory = this.onRemoveStory.bind(this);
  }

  componentDidMount() {
    this.props.productsActions.fetchProductsPage(0, this.state.rowPerPage);
    this.props.storiesActions.fetchStories();
    this.props.issuesActions.fetchIssues();
    this.props.storiesActions.fetchStoriesCount();
  }

  onInputChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onProductChange(event) {
    this.setState({
      product: this.props.products
        .find(product => product.id === Number.parseInt(event.target.id, 10)),
    });
  }

  onToggleModal() {
    this.setDefaultProperties();

    this.setState({
      isActiveAddModal: true,
    });
  }

  onCancelAddStory() {
    this.setState({
      isActiveAddModal: false,
    });
  }

  onToggleUpdateStoryModal(id) {
    const currentStory = this.props.stories.find(story => story.id === id);

    this.setState({
      id,
      description: currentStory.description,
      product: this.props.products.find(product => product.id === currentStory.productId),
      isActiveUpdateModal: true,
    });
  }

  onCancelUpdateStory() {
    this.setState({
      isActiveUpdateModal: false,
    });
  }

  onAddStory() {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .storeStory({
        description: this.state.description,
        productId: this.state.product ? this.state.product.id : 0,
        date: moment(),
      })
      .then(() => this.props.storiesActions.fetchStoriesPage(0, this.state.rowPerPage));
  }

  onUpdateStory() {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .updateStory(this.state.id, {
        description: this.state.description,
        productId: this.state.product ? this.state.product.id : 0,
        date: moment(),
      })
      .then(() => this.props.storiesActions.fetchStoriesPage(0, this.state.rowPerPage));
  }

  onRemoveStory(id) {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .removeProduct(id)
      .then(() => this.props.productsActions.fetchProductsPage(0, this.state.rowPerPage));
  }

  setDefaultProperties() {
    const newState = {
      description: '',
      product: this.props.products.find(product => product),
    };

    this.setState(newState);
  }

  onChangePage(index) {
    this.setState({
      currentPage: index,
    });

    this.props.storiesActions.fetchStoriesPage(index - 1, this.state.rowPerPage);
  }

  render() {
    if (this.props.areProductsFetching ||
        this.props.areStoriesFetching ||
        this.props.areIssuesFetching ||
      this.props.isCountFetching ||
      !this.props.areProductsLoaded ||
      !this.props.areStoriesLoaded ||
      !this.props.areIssuesLoaded ||
      !this.props.isCountLoaded) {
      return (
        <Spinner />
      );
    }

    const stories = account.getAccountRole() === ROLE_MANAGER
      ? this.props.stories
      : this.props.stories.filter(story =>
        !!this.props.products.find(product => story.productId === product.id).users
          .find(user => user.id === Number.parseInt(account.getAccountId(), 10)));

    return (
      <div>
        <DataModal
          actionType="Add New Story"
          confirmName="Add"
          cancelName="Cancel"
          isActive={this.state.isActiveAddModal}
          onTogleModal={this.onToggleModal}
          onConfirm={this.onAddStory}
          onCancel={this.onCancelAddStory}
        >
          <StoriesForm
            description={this.state.description}
            product={this.state.product}
            products={this.props.products}
            onInputChange={this.onInputChange}
            onProductChange={this.onProductChange}
          />
        </DataModal>

        <DataModal
          actionType="Update Story"
          confirmName="Update"
          cancelName="Cancel"
          isActive={this.state.isActiveUpdateModal}
          onTogleModal={this.onToggleUpdateStoryModal}
          onConfirm={this.onUpdateStory}
          onCancel={this.onCancelUpdateStory}
        >
          <StoriesForm
            description={this.state.description}
            product={this.state.product}
            products={this.props.products}
            onInputChange={this.onInputChange}
            onProductChange={this.onProductChange}
          />
        </DataModal>

        <StoriesTable
          stories={stories}
          products={this.props.products}
          issues={this.props.issues}
          currentPage={this.state.currentPage}
          rowPerPage={this.state.rowPerPage}
          total={this.props.total}
          onChangePage={this.onChangePage}
          updateStory={this.onToggleUpdateStoryModal}
          removeStory={this.onRemoveStory}
        />

        {account.getAccountRole() === ROLE_CUSTOMER && (
          <ButtonWrapper>
            <Button color="success" onClick={this.onToggleModal} >Add New Story</Button>
          </ButtonWrapper>
        )}
      </div>
    );
  }
}

StoriesMainPage.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    product: PropTypes.shape({
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
    }),
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
  productsActions: PropTypes.objectOf(PropTypes.func),
  storiesActions: PropTypes.objectOf(PropTypes.func),
  issuesActions: PropTypes.objectOf(PropTypes.func),
  storeStory: PropTypes.func,
  updateStory: PropTypes.func,
  removeStory: PropTypes.func,
  areProductsFetching: PropTypes.bool,
  areProductsLoaded: PropTypes.bool,
  areStoriesFetching: PropTypes.bool,
  areStoriesLoaded: PropTypes.bool,
  areIssuesFetching: PropTypes.bool,
  areIssuesLoaded: PropTypes.bool,
};

StoriesMainPage.defaultProps = {
  stories: [],
  products: [],
  storiesActions: {},
  productsActions: {},
  issuesActions: {},
  storeStory: null,
  updateStory: null,
  removeStory: null,
  areProductsFetching: false,
  areProductsLoaded: false,
  areStoriesFetching: false,
  areStoriesLoaded: false,
  areIssuesFetching: false,
  areIssuesLoaded: false,
};

export default StoriesMainPage;

